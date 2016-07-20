//----------------------------------------------------------------------------------------------------------------------
/// PokemonService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import $http from 'axios';

import stateSvc from './state'

//----------------------------------------------------------------------------------------------------------------------

class PokemonService {
    constructor()
    {
    } // end constructor

    get pokemon(){ return stateSvc.pokemon; }

    _buildDisplayName(name)
    {
        if(name)
        {
            return (_.map(name.split(' '), (part) =>
            {
                return part.charAt(0).toUpperCase() + part.slice(1);
            })).join(' ');
        } // end if
    } // end _buildDisplayName

    getPokeID(name)
    {
        name = name.toLowerCase();
        return _.findKey(stateSvc.pokemon, (item) => item == name);
    } // end  get PokeID

    getDisplayName(number)
    {
        number = _.padStart(number.toString(), 3, '0');
        return this._buildDisplayName(this.pokemon[number]);
    } // end getDisplayName
} // end PokemonService

//----------------------------------------------------------------------------------------------------------------------

export default new PokemonService();

//----------------------------------------------------------------------------------------------------------------------
