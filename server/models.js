//----------------------------------------------------------------------------------------------------------------------
// Database models for PokemonGoCompanion
//
// @module models
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import connect from 'thinky';

import pokemonList from './data/pokemon.json';
import config from '../config';

//----------------------------------------------------------------------------------------------------------------------

var thinky = connect(config.rethink);
var type = thinky.type;
var r = thinky.r;

var db = { r, type, errors: thinky.Errors };

//----------------------------------------------------------------------------------------------------------------------

db.CapturePoint = thinky.createModel('capture', {
    id: type.string(),
    spawnID: type.string().optional(),
    pokemon: type.string().enum(_.values(pokemonList)).required(),
    point: type.point().required(),
    incense: type.boolean().default(false),
    level: type.number().integer().min(1).optional(),
    timestamp: type.date().required()
});

//----------------------------------------------------------------------------------------------------------------------

db.Portal = thinky.createModel('portal', {
    id: type.string(),
    type: type.string().enum(['gym', 'pokestop', 'none', 'unknown']).required(),
    point: type.point().required(),
    name: type.string().required()
});

//----------------------------------------------------------------------------------------------------------------------

export default db;

//----------------------------------------------------------------------------------------------------------------------
