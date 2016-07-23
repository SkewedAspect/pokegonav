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
        this.types = [
            'bug',
            'grass',
            'dark',
            'ground',
            'dragon',
            'ice',
            'electric',
            'normal',
            'fairy',
            'poison',
            'fighting',
            'psychic',
            'fire',
            'rock',
            'flying',
            'steel',
            'ghost',
            'water'
        ];
    } // end constructor

    get pokemon(){ return stateSvc.pokemon; }

    _buildDisplayName(name)
    {
        return (_.map(name.split(' '), (part) =>
        {
            return part.charAt(0).toUpperCase() + part.slice(1);
        })).join(' ');
    } // end _buildDisplayName

    getDisplayName(number)
    {
        number = _.padStart(number.toString(), 3, '0');
        var name = this.pokemon[number];
        if(name)
        {
            return this._buildDisplayName(this.pokemon[number]);
        }
        else
        {
            console.warn('failed to find a name for id:', number);
        } // end if
    } // end getDisplayName
} // end PokemonService

//----------------------------------------------------------------------------------------------------------------------

export default new PokemonService();

//----------------------------------------------------------------------------------------------------------------------
