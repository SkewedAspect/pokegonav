//----------------------------------------------------------------------------------------------------------------------
// Routes for ingress/pokemon portals
//
// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import express from 'express';
import RateLimit from 'express-rate-limit';
import models from '../models';

//----------------------------------------------------------------------------------------------------------------------

var router = express.Router();

var limiter = new RateLimit({
    headers: true,
    windowMs: 15*60*1000,   // 15 minutes
    max: 100,               // Start blocking after 100 requests in a 15 minute interval
    delayAfter: 20,         // After 20 requests, we start delaying you
    delayMs: 500            // After 20 requests, each request has an artificial 500ms delay on it.
});

router.use(limiter);

//----------------------------------------------------------------------------------------------------------------------
// REST Endpoints
//----------------------------------------------------------------------------------------------------------------------

router.get('/', function(req, resp)
{
    var r = models.r;
    if(req.query.bbox)
    {
        var bboxPoints = _.map(req.query.bbox.split(','), (num) => parseFloat(num));

        if(bboxPoints.length == 4)
        {
            var x1 = bboxPoints[0];
            var y1 = bboxPoints[1];
            var x2 = bboxPoints[2];
            var y2 = bboxPoints[3];

            var bbox = r.polygon(
                r.point(x1, y1),
                r.point(x2, y1),
                r.point(x2, y2),
                r.point(x1, y2)
            );

            return models.Portal.getIntersecting(bbox, {index: 'point'})
                .then((points) =>
                {
                    resp.json(points);
                });
        } // end if
    } // end if
    
    // Failure case
    resp.status(400).json({
        type: 'InvalidArgumentsError',
        message: "Invalid arguments. Did you pass the `bbox` parameter?"
    });
});

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
