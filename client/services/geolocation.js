//----------------------------------------------------------------------------------------------------------------------
/// GeolocationService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import Promise from 'bluebird';
import ol from 'openlayers';
import { toastService as toastSvc } from 'vueboot';

import mapSvc from './map';

//----------------------------------------------------------------------------------------------------------------------

class GeolocationService {
    constructor()
    {
        this.currentPos = new ol.Feature(new ol.geom.Point([0, 0]));

        // Setup GeoLocation
        if("geolocation" in navigator)
        {
            toastSvc.create({
                type: 'success',
                dismissible: true,
                content: 'Geolocation Enabled.',
                timeout: 2000
            });
            
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
        var map = mapSvc.map;
        var view = mapSvc.map.getView();

        var coords = ol.proj.fromLonLat([
            position.coords.longitude,
            position.coords.latitude
        ]);
        
        toastSvc.create({
            type: 'info',
            dismissible: true,
            content: 'Updating location...',
            timeout: 1000
        });

        // Store the current position
        this.currentPos.getGeometry().setCoordinates(coords);
    } // end _updatePos
    
    _errorGettingPos()
    {
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
            .then(this._updatePos.bind(this))
            .then(() =>
            {
                var map = mapSvc.map;
                var view = mapSvc.map.getView();
                
                // Fit the view to the point
                view.fit(this.currentPos.getGeometry(), map.getSize(), {
                    padding: [5, 5, 5, 5],
                    maxZoom: 17
                });
            })
            .catch(this._errorGettingPos.bind(this));
    } // end updateLocation
} // end GeolocationService

//----------------------------------------------------------------------------------------------------------------------

export default new GeolocationService();

//----------------------------------------------------------------------------------------------------------------------
