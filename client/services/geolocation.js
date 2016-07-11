//----------------------------------------------------------------------------------------------------------------------
/// GeolocationService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import Promise from 'bluebird';
import ol from 'openlayers';
import { toastService as toastSvc } from 'vueboot';

import mapSvc from './map';
import CurrentPosLayer from '../layers/currentPos';

//----------------------------------------------------------------------------------------------------------------------

class GeolocationService {
    constructor()
    {
        this.autoUpdateView = false;
        this.currentPos = new ol.Feature(new ol.geom.Point([0, 0]));

        // Setup currentPosLayer
        CurrentPosLayer.addFeature(this.currentPos);

        // Setup GeoLocation
        if("geolocation" in navigator)
        {
            // Watch the current position, and keep it updated
            this.watchHandle = navigator.geolocation.watchPosition(this._updatePos.bind(this), this._errorGettingPos.bind(this), {
                    enableHighAccuracy: true,
                    maximumAge        : 30000,
                    timeout           : 27000
                });
        }
        else
        {
            toastSvc.create({
                type: 'danger',
                dismissible: true,
                content: 'Geolocation Disabled.',
                timeout: false
            });
        } // end if
    } // end constructor

    _updatePos(position)
    {
        var coords = ol.proj.fromLonLat([
            position.coords.longitude,
            position.coords.latitude
        ]);
        
        console.log('updating pos...');

        // Store the current position
        this.currentPos.getGeometry().setCoordinates(coords);

        if(this.autoUpdateView)
        {
            this._updateView();
        } // end if
    } // end _updatePos

    _updateView()
    {
        var view = mapSvc.map.getView();
        view.setCenter(this.currentPos.getGeometry().getCoordinates());

        return Promise.resolve();
    } // end updateView

    _errorGettingPos(error)
    {
        console.error('Unable to retrieve your location.', error);
        
        toastSvc.create({
            type: 'danger',
            dismissible: true,
            content: 'Unable to retrieve your location.',
            timeout: false
        });
    } // end _errorGettingPos

    updateLocation()
    {
        return new Promise((resolve, reject) => { navigator.geolocation.getCurrentPosition(resolve, reject); })
            .then((position) =>
            {
                this._updatePos(position);
                this._updateView();
            })
            .catch(this._errorGettingPos.bind(this));
    } // end updateLocation

    zoomToLocation()
    {
        var map = mapSvc.map;
        var view = mapSvc.map.getView();

        console.log('zoom!!!');

        // Fit the view to the point
        view.fit(this.currentPos.getGeometry(), map.getSize(), {
            padding: [5, 5, 5, 5],
            maxZoom: 17
        });
    } // end zoomToLocation
} // end GeolocationService

//----------------------------------------------------------------------------------------------------------------------

export default new GeolocationService();

//----------------------------------------------------------------------------------------------------------------------
