//----------------------------------------------------------------------------------------------------------------------
// Database models for PokemonGoCompanion
//
// @module models
//----------------------------------------------------------------------------------------------------------------------

import connect from 'thinky';

import config from '../config';

//----------------------------------------------------------------------------------------------------------------------

var thinky = connect(config.rethink);
var type = thinky.type;
var r = thinky.r;

var db = { r, type, errors: thinky.Errors };

//----------------------------------------------------------------------------------------------------------------------

db.CapturePoint = thinky.createModel('capture', {
    id: type.string(),
    encounterID: type.string().optional(),
    pokemonID: type.number().integer(),
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
    name: type.string().optional()
});

//----------------------------------------------------------------------------------------------------------------------

export default db;

//----------------------------------------------------------------------------------------------------------------------
