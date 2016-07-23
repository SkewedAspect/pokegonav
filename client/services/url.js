//----------------------------------------------------------------------------------------------------------------------
/// URLService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import qs from 'querystring';

import pokeSvc from './pokemon';

//----------------------------------------------------------------------------------------------------------------------

class URLService {
    constructor()
    {
        this.queryParams = qs.parse(window.location.search.substr(1));

        // Parse Location
        if(this.queryParams.location)
        {
            this.queryParams.location = _.map(this.queryParams.location.split(','), (part) => parseFloat(part));
        } // end if

        // Parse Zoom
        this.queryParams.zoom = parseInt(this.queryParams.zoom) || 12;

        // Parse Filter
        if(this.queryParams.filter)
        {
            this.queryParams.filter = [].concat(this.queryParams.filter);
            this.queryParams.filter = _.map(this.queryParams.filter, (tag) =>
            {
                // Don't try to parse the types as integers
                return _.includes(pokeSvc.types, tag) ? tag : _.padStart(tag, 3, '0');
            });
        } // end if

        // Parse layers
        if(this.queryParams.layers)
        {
            this.queryParams.layers = [].concat(this.queryParams.layers);
        } // end if
    } // end constructor

    buildQueryString(params)
    {
        var queryString = "";

        // Encode our location specially
        if(params.location)
        {
            queryString += `location=${ params.location.join(',') }&`;
            params.location = undefined;
        } // end if

        // Clean up params object
        params = _.transform(params, (res, v, k) => { if(v) res[k] = v; });

        // Return everything encoded.
        return queryString += qs.stringify(params);
    } // end buildQueryString
} // end URLService

//----------------------------------------------------------------------------------------------------------------------

export default new URLService();

//----------------------------------------------------------------------------------------------------------------------
