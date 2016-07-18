//----------------------------------------------------------------------------------------------------------------------
// Configuration for PokemonGoCompanion
//
// @module
//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    debug: true,
    http: {
        port: process.env.SERVER_PORT || 8080
    },
    rethink: {
        host: process.env.RETHINK_DB_HOST || 'localhost',
        port: process.env.RETHINK_DB_PORT || 28015,
        db: 'pgo'
    },
    apiKey: process.env.PORTAL_API_KEY || 'MudKips#RULE'
}; // end exports

//----------------------------------------------------------------------------------------------------------------------
