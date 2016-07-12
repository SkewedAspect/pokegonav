//----------------------------------------------------------------------------------------------------------------------
/// CurrentPositionLayer
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash'
import $http from 'axios';
import ol from 'openlayers';

import pokeSvc from '../services/pokemon';

//----------------------------------------------------------------------------------------------------------------------

class CurrentPositionLayer {
    constructor()
    {
        this.layer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        
        this.refresh();
    } // end constructor
    
    refresh()
    {
        this.layer.getSource().clear();
        
        // Get the list of all of the points
        $http.get('/capture')
            .then((response) =>
            {
                _.each(response.data, (capture) =>
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

                    var iconStyle = new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 0.5],
                            src: `/static/icons/${ parseInt(pokeID) }.png`
                        })
                    });

                    feature.setStyle(iconStyle);

                    this.layer.getSource().addFeature(feature);
                });
            });
    } // end refresh
} // end CurrentPositionLayer

//----------------------------------------------------------------------------------------------------------------------

export default new CurrentPositionLayer();

//----------------------------------------------------------------------------------------------------------------------
