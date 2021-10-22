var express = require('express');
var parseUrl = require('parse-url');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');

router.get('/:location', (req, res, next) => {
    Event.find({}, (err, events) => {
        Event.distinct("event_category", (err, allCategories) =>{
            if (err) return next(err);
            console.log(err, allCategories);
            Event.distinct("location", (err, allLocations) =>{
              if (err) return next(err);
              console.log(err, allLocations);
              res.render('events', {events:events, allCategories: allCategories, allLocations: allLocations });
            });
        });
      });
})

module.exports = router