//----------------------------------------------------------------------------------------------------------------------
/// PortalLayer
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash'
import $http from 'axios';
import ol from 'openlayers';

import styleSvc from '../services/style';

//----------------------------------------------------------------------------------------------------------------------

class PortalLayer {
    constructor()
    {
        this.layer = new ol.layer.Vector({
            source: new ol.source.Vector({ wrapX: false }),
            style: this._styleFunction.bind(this),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });

        this._update = _.debounce((extent) =>
        {
            var coord1 = ol.proj.toLonLat([ extent[0], extent[1] ]);
            var coord2 = ol.proj.toLonLat([ extent[2], extent[3] ]);

            // Get the list of all of the points
            $http.get(`/portal?bbox=${ coord1.join(',') },${ coord2.join(',') }`)
                .then((response) =>
                {
                    _.each(response.data, (capture) =>
                    {
                        this._addPortal(capture);
                    });
                });
        }, 500, { maxWait: 1000 });
    } // end constructor

    _addPortal(portal)
    {
        var coords = ol.proj.fromLonLat([
            portal.point.coordinates[0],
            portal.point.coordinates[1]
        ]);

        var feature = new ol.Feature(new ol.geom.Point(coords));
        feature.setId(portal.id);
        feature.set('type', portal.type);
        feature.set('name', portal.name);

        this.layer.getSource().addFeature(feature);
    } // end _addPortal

    _styleFunction(feature, resolution)
    {
        if(resolution < 20)
        {
            switch(feature.get('type'))
            {
                case 'gym':
                    return styleSvc.gymStyle;
                
                case 'pokestop':
                    return styleSvc.stopStyle;
                
                default:
                    return styleSvc.unknownPortalStyle;
            } // end switch
        }
        else if(resolution < 300)
        {
            switch(feature.get('type'))
            {
                case 'gym':
                    return styleSvc.zoomedGymStyle;

                case 'pokestop':
                    return styleSvc.zoomedStopStyle;

                default:
                    return styleSvc.unknownPortalStyle;
            } // end switch
        } // end if
    } // end _styleFunction

    setVisible(visible)
    {
        this.layer.setVisible(visible);
    } // end setVisible

    redraw()
    {
        this.layer.getSource().changed();
    } // end redraw()

    update(extent, zoom)
    {
        if(zoom > 9)
        {
            this._update(extent);
        } // end if
    } // end update
} // end PortalLayer

//----------------------------------------------------------------------------------------------------------------------

export default new PortalLayer();

//----------------------------------------------------------------------------------------------------------------------

