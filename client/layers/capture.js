//----------------------------------------------------------------------------------------------------------------------
/// CurrentPositionLayer
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash'
import $http from 'axios';
import ol from 'openlayers';

import stateSvc from '../services/state';
import pokeSvc from '../services/pokemon';

//----------------------------------------------------------------------------------------------------------------------

class CurrentPositionLayer {
    constructor()
    {
        this.layer = new ol.layer.Vector({
            source: new ol.source.Vector({ wrapX: false }),
            style: this._styleFunction.bind(this),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });

        this.refresh();
    } // end constructor

    _buildStyle(feature)
    {
        var pokeID = feature.get('pokemonID');

        if(pokeID)
        {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    src: `/static/icons/${ parseInt(pokeID) }.png`
                })
            });
        } // end if
    } // end _buildStyle

    _styleFunction(feature, resolution)
    {
        if(_.isEmpty(stateSvc.state.filter) || feature.get('name').toLowerCase() == stateSvc.state.filter)
        {
            return this._buildStyle(feature);
        } // end if

        return null;
    } // end _styleFunction

    addCapture(capture)
    {
        var coords = ol.proj.fromLonLat([
            capture.point.coordinates[0],
            capture.point.coordinates[1]
        ]);

        var feature = new ol.Feature(new ol.geom.Point(coords));
        var pokeID = pokeSvc.getPokeID(capture.pokemon);
        feature.setId(capture.id);
        feature.set('pokemonID', pokeID);
        feature.set('name', pokeSvc.getDisplayName(pokeID));

        this.layer.getSource().addFeature(feature);
    } // end addCapture

    setVisible(visible)
    {
        this.layer.setVisible(visible);
    } // end setVisible
    
    redraw()
    {
        this.layer.getSource().changed();
    } // end redraw()
    
    refresh()
    {
        this.layer.getSource().clear();

        // Get the list of all of the points
        $http.get('/capture')
            .then((response) =>
            {
                _.each(response.data, (capture) =>
                {
                    this.addCapture(capture);
                });
            });
    } // end refresh
} // end CurrentPositionLayer

//----------------------------------------------------------------------------------------------------------------------

export default new CurrentPositionLayer();

//----------------------------------------------------------------------------------------------------------------------
