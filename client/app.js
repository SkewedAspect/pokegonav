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

// Pages
import ZoomControls from './components/zoomControls.vue';
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
        map: MapComponent
    }
});

// ---------------------------------------------------------------------------------------------------------------------
