//----------------------------------------------------------------------------------------------------------------------
/// CurrentPositionLayer
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import ol from 'openlayers';
import mapSvc from '../services/map';

//----------------------------------------------------------------------------------------------------------------------

class CurrentPositionLayer {
    constructor()
    {
        this.layer = new ol.layer.Vector({
            map: mapSvc.map,
            source: new ol.source.Vector({
                wrapX: false,
                useSpatialIndex: false
            }),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: '#33ccff'
                    })
                })
            }),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
    } // end constructor

    addFeature(feature)
    {
        this.layer.getSource().addFeature(feature);
    } // end addFeature
} // end CurrentPositionLayer

//----------------------------------------------------------------------------------------------------------------------

export default new CurrentPositionLayer();

//----------------------------------------------------------------------------------------------------------------------
