//----------------------------------------------------------------------------------------------------------------------
/// MapService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import { EventEmitter } from 'events';
import ol from 'openlayers';

// Layers
import PortalLayer from '../layers/portal';
import CaptureLayer from '../layers/capture';

//----------------------------------------------------------------------------------------------------------------------

class MapService extends EventEmitter {
    constructor()
    {
        super();

        this.panEnabled = false;

        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    preload: Infinity,
                    source: new ol.source.OSM({ wrapX : false })
                }),

                PortalLayer.layer,
                CaptureLayer.layer
            ],
            controls: [],
            interactions: ol.interaction.defaults({
                pinchRotate:false,
                dragPan: false
            }),
            view: new ol.View({
                center: ol.proj.fromLonLat([-101.87, 33.57]),
                zoom: 12,
                maxZoom: 20
            })
        });

        this._setupEvents();

        // Add the Draw interaction for the Capture Layer
        this.map.addInteraction(CaptureLayer.draw);

        // Store this seperately, because we'll be adding and removing it.
        this.dragPan = new ol.interaction.DragPan();

        // Add it to the map
        this.enablePan();
    } // end constructor

    _setupEvents()
    {
        var view = this.map.getView();

        // Setup View events
        view.on('change:center', this.emit.bind(this, 'view changed'));
        view.on('change:resolution', this.emit.bind(this, 'view changed'));

        // Bind to self events
        this.on('view changed', () =>
        {
            var extent = this.getExtent(50);
            PortalLayer.update(extent, view.getZoom());
        });
    } // end _setupEvents

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

    getExtent(padding)
    {
        var extent = this.map.getView().calculateExtent(this.map.getSize());

        if(padding)
        {
            extent = ol.extent.buffer(extent, padding);
        } // end if

        return extent;
    } // end getExtent

    setTarget(target)
    {
        this.map.setTarget(target);
    } // end setTarget
} // end MapService

//----------------------------------------------------------------------------------------------------------------------

export default new MapService();

//----------------------------------------------------------------------------------------------------------------------
