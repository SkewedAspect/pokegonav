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
import PokeFilter from './components/pokeFilter.vue';
import AddControl from './components/addPoint.vue';
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
        add: AddControl,
        filter: PokeFilter,
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
