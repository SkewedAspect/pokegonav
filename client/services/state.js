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
            filter: ""
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
