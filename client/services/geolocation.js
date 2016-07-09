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
        this.currentPos = undefined;

        // Setup GeoLocation
        if("geolocation" in navigator)
        {
            toastSvc.create({
                type: 'success',
                dismissible: true,
                content: 'Geolocation Enabled.',
                timeout: 2000
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

    _updatePos(position, animate)
    {
        var map = mapSvc.map;
        var view = mapSvc.map.getView();

        var coords = ol.proj.fromLonLat([
            position.coords.longitude,
            position.coords.latitude
        ]);

        // Store the current position
        this.currentPos = new ol.geom.Point(coords);

        // Fit the view to the point
        view.fit(this.currentPos, map.getSize(), {
            padding: [5, 5, 5, 5],
            maxZoom: 17
        });
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
            .catch(this._errorGettingPos.bind(this));
    } // end updateLocation

    watchLocation()
    {
        return new Promise((resolve, reject) =>
            {
                this.watchHandle = navigator.geolocation.watchPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    maximumAge        : 30000,
                    timeout           : 27000
                });
            })
            .then(this._updatePos.bind(this))
            .then(this.updateLocation.bind(this))
            .catch(this._errorGettingPos.bind(this));
    } // end watchLocation

    unwatchLocation()
    {
        navigator.geolocation.clearWatch(this.watchHandle);
        this.watchHandle = undefined;
    } // end unwatchLocation
} // end GeolocationService

//----------------------------------------------------------------------------------------------------------------------

export default new GeolocationService();

//----------------------------------------------------------------------------------------------------------------------
