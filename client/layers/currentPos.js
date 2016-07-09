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
                useSpatialIndex: false // optional, might improve performance
            }),
            // style: [new ol.style.Style({
            //     fill: new ol.style.Fill({ color: 'rgba(21, 137, 255, 0.9)' }),
            //     stroke: new ol.style.Stroke({ color: 'rgba(21, 137, 255, 1)' })
            // })],
            updateWhileAnimating: true, // optional, for instant visual feedback
            updateWhileInteracting: true // optional, for instant visual feedback
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
