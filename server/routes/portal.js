//----------------------------------------------------------------------------------------------------------------------
// Routes for ingress/pokemon portals
//
// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import express from 'express';
import models from '../models';

//----------------------------------------------------------------------------------------------------------------------

var router = express.Router();

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
