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
        this.showGyms = true;
        this.showStops = true;

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
                    _.each(response.data, (portal) =>
                    {
                        this._addPortal(portal);
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
            var style;
            switch(feature.get('type'))
            {
                case 'gym':
                    style = this.showGyms ? styleSvc.gymStyle : null;
                    break;

                case 'pokestop':
                    style = this.showStops ? styleSvc.stopStyle : null;
                    break;
                //
                // default:
                //     return styleSvc.unknownPortalStyle;
            } // end switch

            if(style)
            {
                // Basically, point slope formula for [[.3, 1], [20, .5]]
                var scale = Math.abs(-((resolution * .5) / 19.7) + (19.85 / 19.7));

                // Floor of 0.5 and Ceiling of 1.00
                scale = Math.max(scale, .5);
                scale = Math.min(scale, 1);

                // Set the scale
                style[0].getImage().setScale(scale);
                style[1].getImage().setScale(scale);
            } // end if

            return style;
        }
        else if(resolution < 300)
        {
            switch(feature.get('type'))
            {
                case 'gym':
                    return this.showGyms ? styleSvc.zoomedGymStyle : null;

                case 'pokestop':
                    return this.showStops ? styleSvc.zoomedStopStyle : null;

                default:
                    return styleSvc.unknownPortalStyle;
            } // end switch
        } // end if
    } // end _styleFunction

    setGymsVisible(visible)
    {
        this.showGyms = visible;
        this.redraw();
    } // end setGymsVisible

    setStopsVisible(visible)
    {
        this.showStops = visible;
        this.redraw();
    } // end setStopsVisible

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

