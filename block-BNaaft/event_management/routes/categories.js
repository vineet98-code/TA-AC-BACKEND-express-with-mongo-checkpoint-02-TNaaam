var express = require('express');
var parseUrl = require('parse-url');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');
/* GET home page. */

router.get('/', function (req, res, next) {
  var name = req.query.name;
  Event.find({}).exec((err, events) => {
    var arrayEvents = events.filter((event) => {
      if (event.event_category.split(',').includes(name)) {
        return event;
      }
    });
    Event.find({}, (err, events) => {
      if (err) return next(err);
      var allCategories = [];
      events.filter((event) => {
        // console.log(event);
        var some = event.event_category.split(',');
        for (var i = 0; i < some.length; i++) {
          if (!allCategories.includes(some[i])) {
            allCategories.push(some[i]);
          }
        }
      });
      var allLocations = [];
      events.filter((event) => {
        if (!allLocations.includes(event.location)) {
          allLocations.push(event.location);
        }
      });
      res.render('events', {
        events: events,
        allCategories: allCategories,
        allLocations: allLocations,
        events: arrayEvents,
      });
    });
  });
});

router.get('/location', function (req, res, next) {
  var location = req.query.location;
  console.log(location);
  Event.find({ location: location }).exec((err, locationEvents) => {
    Event.find({}, (err, events) => {
      if (err) return next(err);
      var allCategories = [];
      events.filter((event) => {
        // console.log(event);
        var some = event.event_category.split(',');
        for (var i = 0; i < some.length; i++) {
          if (!allCategories.includes(some[i])) {
            allCategories.push(some[i]);
          }
        }
      });

      var allLocations = [];
      events.filter((event) => {
        if (!allLocations.includes(event.location)) {
          allLocations.push(event.location);
        }
      });
      res.render('events', {
        events: locationEvents,
        allCategories: allCategories,
        allLocations: allLocations,
      });
    });
  });
});
module.exports = router;

router.get('/ascend', function (req, res, next) {
  Event.find({})
    .sort({ start_date: 1 })
    .exec((err, ascendEvents) => {
      Event.find({}, (err, events) => {
        if (err) return next(err);
        var allCategories = [];
        events.filter((event) => {
          // console.log(event);
          var some = event.event_category.split(',');
          for (var i = 0; i < some.length; i++) {
            if (!allCategories.includes(some[i])) {
              allCategories.push(some[i]);
            }
          }
        });

        var allLocations = [];
        events.filter((event) => {
          if (!allLocations.includes(event.location)) {
            allLocations.push(event.location);
          }
        });
        res.render('events', {
          events: ascendEvents,
          allCategories: allCategories,
          allLocations: allLocations,
        });
      });
    });
});

router.get('/descend', function (req, res, next) {
  Event.find({})
    .sort({ start_date: -1 })
    .exec((err, events) => {
      Event.find({}, (err, descendEvents) => {
        if (err) return next(err);
        var allCategories = [];
        events.filter((event) => {
          // console.log(event);
          var some = event.event_category.split(',');
          for (var i = 0; i < some.length; i++) {
            if (!allCategories.includes(some[i])) {
              allCategories.push(some[i]);
            }
          }
        });

        var allLocations = [];
        events.filter((event) => {
          if (!allLocations.includes(event.location)) {
            allLocations.push(event.location);
          }
        });
        res.render('events', {
          events: descendEvents,
          allCategories: allCategories,
          allLocations: allLocations,
        });
      });
    });
});

router.post('/dateSort', function (req, res, next) {
  var body = req.body;
  Event.find(
    {
      start_date: {
        $gte: body.start_date,
        $lt: body.end_date,
      },
    },
    (err, dateEvents) => {
      Event.find({}, (err, events) => {
        if (err) return next(err);
        var allCategories = [];
        events.filter((event) => {
          // console.log(event);
          var some = event.event_category.split(',');
          for (var i = 0; i < some.length; i++) {
            if (!allCategories.includes(some[i])) {
              allCategories.push(some[i]);
            }
          }
        });

        var allLocations = [];
        events.filter((event) => {
          if (!allLocations.includes(event.location)) {
            allLocations.push(event.location);
          }
        });
        res.render('events', {
          events: dateEvents,
          allCategories: allCategories,
          allLocations: allLocations,
        });
      });
    }
  );
});