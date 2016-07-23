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
        this.queryParams.location = _.map(this.queryParams.location.split(','), (part) => parseFloat(part));

        // Parse Zoom
        this.queryParams.zoom = parseInt(this.queryParams.zoom) || 12;

        // Parse Filter
        this.queryParams.filter = [].concat(this.queryParams.filter);
        this.queryParams.filter = _.map(this.queryParams.filter, (tag) =>
        {
            // Don't try to parse the types as integers
            return _.includes(pokeSvc.types, tag) ? tag : _.padStart(tag, 3, '0');
        });

        // Parse layers
        if(this.queryParams.layers)
        {
            this.queryParams.layers = [].concat(this.queryParams.layers);
        } // end if
    } // end constructor

    buildQueryString(params)
    {
        return qs.stringify(params);
    } // end buildQueryString
} // end URLService

//----------------------------------------------------------------------------------------------------------------------

export default new URLService();

//----------------------------------------------------------------------------------------------------------------------
