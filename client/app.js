//----------------------------------------------------------------------------------------------------------------------
/// Main Client-side Application
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

// Overwrite the global promise with Bluebird. This makes `axios` use Bluebird promises.
import Promise from 'bluebird';
window.Promise = Promise;

//----------------------------------------------------------------------------------------------------------------------

import Vue from 'vue';
import vueboot from 'vueboot';

// Services
import stateSvc from './services/state';
import pokeSvc from './services/pokemon';
import pkg from '../package.json';

// Controls
import LayerControls from './components/layerControls.vue';
import CaptureControls from './components/captureControls.vue';
import ZoomControls from './components/zoomControls.vue';
import LinksComponent from './components/links.vue';
import MapComponent from './pages/main/map.vue';

//----------------------------------------------------------------------------------------------------------------------
// App Setup
//----------------------------------------------------------------------------------------------------------------------

Vue.config.debug = true;

stateSvc.app = new Vue({
    el: '#main-app',
    components: {
        toast: vueboot.toast,
        zoom: ZoomControls,
        capture: CaptureControls,
        layer: LayerControls,
        links: LinksComponent,
        map: MapComponent
    }
});

// ---------------------------------------------------------------------------------------------------------------------
// Version information
// ---------------------------------------------------------------------------------------------------------------------

window.PokeGoNav = {
    version: pkg.version
};

// ---------------------------------------------------------------------------------------------------------------------
