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
                useSpatialIndex: false
            }),
            // style: [new ol.style.Style({
            //     fill: new ol.style.Fill({ color: 'rgba(21, 137, 255, 0.9)' }),
            //     stroke: new ol.style.Stroke({ color: 'rgba(21, 137, 255, 1)' })
            // })],
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
