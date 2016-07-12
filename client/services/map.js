//----------------------------------------------------------------------------------------------------------------------
/// MapService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import ol from 'openlayers';

// Layers
import CaptureLayer from '../layers/capture';

//----------------------------------------------------------------------------------------------------------------------

class MapService {
    constructor()
    {
        this.panEnabled = false;
        
        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    preload: Infinity,
                    source: new ol.source.OSM()
                }),
                
                CaptureLayer.layer
            ],
            interactions: ol.interaction.defaults({
                dragPan: false
            }),
            controls: [],
            view: new ol.View({
                center: [0, 0],
                zoom: 2,
                maxZoom: 20
            })
        });

        // Store this seperately, because we'll be adding and removing it.
        this.dragPan = new ol.interaction.DragPan();
        
        // Add it to the map
        this.enablePan();
    } // end constructor

    enablePan()
    {
        if(!this.panEnabled)
        {
            this.map.addInteraction(this.dragPan);
            this.panEnabled = true;
        } // end if
    } // end enablePan
    
    disablePan()
    {
        if(this.panEnabled)
        {
            this.map.removeInteraction(this.dragPan);
            this.panEnabled = false;
        } // end if
    } // end disablePan()
    
    setTarget(target)
    {
        this.map.setTarget(target);
    } // end setTarget
} // end MapService

//----------------------------------------------------------------------------------------------------------------------

export default new MapService();

//----------------------------------------------------------------------------------------------------------------------
