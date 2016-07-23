//----------------------------------------------------------------------------------------------------------------------
/// StateService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import Vue from 'vue';

import pokemon from '../../server/data/pokemon.json';

//----------------------------------------------------------------------------------------------------------------------

class StateService {
    constructor()
    {
        this.state = {
            app: undefined,
            pokemon: pokemon,
            autoUpdateView: false,
            geoEnabled: false,
            layers: {
                gyms: true,
                stops: true,
                captured: true
            },
            filter: "",
            center: [0, 0],
            zoom: 13
        };

        // Build getter/setters for pure JS modules to use
        _.forIn(this.state, (value, key) =>
        {
            Object.defineProperty(this, key, {
                get: function(){ return this.state[key]; },
                set: function(val) { Vue.set(this.state, key, val); }
            })
        });
    } // end constructor
} // end StateService

//----------------------------------------------------------------------------------------------------------------------

export default new StateService();

//----------------------------------------------------------------------------------------------------------------------
