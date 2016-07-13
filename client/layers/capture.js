//----------------------------------------------------------------------------------------------------------------------
/// CurrentPositionLayer
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

class CurrentPositionLayer {
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

        this.refresh();
    } // end constructor

    _buildStyle(feature)
    {
        var pokeID = feature.get('pokemonID');

        if(pokeID)
        {
            return styleSvc.getPokeStyle(pokeID);
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
        var pokeID = pokeSvc.getPokeID(capture.pokemon);
        feature.setId(capture.id);
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
