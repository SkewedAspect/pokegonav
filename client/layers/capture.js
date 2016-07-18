//----------------------------------------------------------------------------------------------------------------------
/// CapturePointsLayer
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash'
import $http from 'axios';
import ol from 'openlayers';

import stateSvc from '../services/state';
import styleSvc from '../services/style';
import pokeSvc from '../services/pokemon';

//----------------------------------------------------------------------------------------------------------------------

class CapturePointsLayer {
    constructor()
    {
        this.layer = new ol.layer.Vector({
            source: new ol.source.Vector({ wrapX: false }),
            style: this._styleFunction.bind(this),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });

        this.drawnPoints = new ol.Collection();

        this.draw = new ol.interaction.Draw({
            features: this.drawnPoints,
            type: 'Point'
        });

        // Deactivate this interaction
        this.draw.setActive(false);

        // Listen for when new features are added.
        this.drawnPoints.on('add', this._handleDraw.bind(this));

        this._update = _.debounce((extent) =>
        {
            var coord1 = ol.proj.toLonLat([ extent[0], extent[1] ]);
            var coord2 = ol.proj.toLonLat([ extent[2], extent[3] ]);

            // Get the list of all of the points
            $http.get(`/capture?bbox=${ coord1.join(',') },${ coord2.join(',') }`)
                .then((response) =>
                {
                    _.each(response.data, (capture) =>
                    {
                        this.addCapture(capture);
                    });
                });
        }, 500, { maxWait: 1000 });
    } // end constructor


    _styleFunction(feature, resolution)
    {
        if(_.isEmpty(stateSvc.state.filter) || feature.get('name').toLowerCase() == stateSvc.state.filter)
        {
            var pokeID = feature.get('pokemonID');
            if(resolution < 20)
            {
                return styleSvc.getPokeStyle(pokeID);
            }
            else if(resolution < 300)
            {
                return styleSvc.zoomedPokemonStyle;
            } // end if
        } // end if

        return null;
    } // end _styleFunction

    _handleDraw(event)
    {
        var point = event.element;

        if(this.drawCallback)
        {
            this.drawCallback(ol.proj.toLonLat(point.getGeometry().getCoordinates()));
        } // end if
    } // end _handleDraw

    addCapture(capture)
    {
        var coords = ol.proj.fromLonLat([
            capture.point.coordinates[0],
            capture.point.coordinates[1]
        ]);

        var feature = new ol.Feature(new ol.geom.Point(coords));
        var pokeID = capture.pokemonID || pokeSvc.getPokeID(capture.pokemon);
        feature.setId(capture.id);
        feature.set('spawnID', capture.spawnID);
        feature.set('pokemonID', pokeID);
        feature.set('name', pokeSvc.getDisplayName(pokeID));

        this.layer.getSource().addFeature(feature);
    } // end addCapture

    enableDraw(callback)
    {
        this.draw.setActive(true);
        this.drawCallback = callback;
    } // end enableDraw

    disableDraw()
    {
        this.draw.setActive(false);
        this.drawCallback = undefined;
    } // end enableDraw

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
} // end CapturePointsLayer

//----------------------------------------------------------------------------------------------------------------------

export default new CapturePointsLayer();

//----------------------------------------------------------------------------------------------------------------------

