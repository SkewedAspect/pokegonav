//----------------------------------------------------------------------------------------------------------------------
/// StyleService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import ol from 'openlayers';

//----------------------------------------------------------------------------------------------------------------------

class StyleService {
    constructor()
    {
        this.pokemonStyles = _.map(_.range(152), (id) =>
        {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    src: `/static/icons/${ _.padStart(id, 3, '0') }.png`
                })
            });
        });

        // Unknown (or zoomed out) Pokemon Style
        this.zoomedPokemonStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: 'rgba(200, 200, 0, 0.75)' }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 255, 255, 1.0)',
                    width: 1
                })
            })
        });

        // Pokemon Gym Style
        this.gymStyle = [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.75)' }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(6, 51, 118, 1.0)',
                        width: 3
                    })
                })
            }),
            new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1.0],
                    src: `/static/icons/gym.png`
                })
            })
        ];

        // Zoomed out Gym Style
        this.zoomedGymStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: 'rgba(6, 51, 118, 0.75)' }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 255, 255, 1.0)',
                    width: 1
                })
            })
        });

        // Pokestop Style
        this.stopStyle = [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.75)' }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(176, 25, 45, 1.0)',
                        width: 3
                    })
                })
            }),
            new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1.0],
                    src: `/static/icons/pokestop.png`
                })
            })
        ];

        // Zoomed out Gym Style
        this.zoomedStopStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: 'rgba(176, 25, 45, 0.75)' }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 255, 255, 1.0)',
                    width: 1
                })
            })
        });

        // Unknown portal Style
        this.unknownPortalStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: 'rgba(96, 96, 96, 0.75)' }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(230, 230, 230, 1.0)',
                    width: 1
                })
            })
        });
    } // end constructor

    getPokeStyle(id)
    {
        return this.pokemonStyles[parseInt(id)];
    } // end getPokeStyle
} // end StyleService

//----------------------------------------------------------------------------------------------------------------------

export default new StyleService();

//----------------------------------------------------------------------------------------------------------------------
