//----------------------------------------------------------------------------------------------------------------------
// Routes for the list of all 151 pokemon
//
// @module
//----------------------------------------------------------------------------------------------------------------------

import express from 'express';
import models from '../models';

//----------------------------------------------------------------------------------------------------------------------

var router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// REST Endpoints
//----------------------------------------------------------------------------------------------------------------------

router.get('/', function(req, resp)
{
    //TODO: Need to require a centerpoint and radius

    models.CapturePoint.filter({})
        .then((points) =>
        {
            resp.json(points);
        });
});

router.put('/', function(req, resp)
{
    var point = new models.CapturePoint(req.body);

    point.save()
        .then(() =>
        {
            resp.end();
        })
        .catch((error) =>
        {
            console.error('Error saving point:', error.name, error);

            resp.status(400).json({
                type: error.name,
                message: error.message,
                stack: error.stack.split('\n')
            });
        });
});

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
