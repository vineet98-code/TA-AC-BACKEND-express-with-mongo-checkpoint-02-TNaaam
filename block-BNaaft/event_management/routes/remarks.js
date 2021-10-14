var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');


router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) return next(err);
    res.render('editRemark', { remark });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body, (err, updatedRemark) => {
    if (err) return next(err);
    res.redirect('/events/' + updatedRemark.eventId);
  });
});

router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Remark.findByIdAndRemove(id, (err, remark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(remark.eventId, { $pull: { remarks: remark._id }}, (err, event) => {
        if (err) return next(err);
        res.redirect('/events/' + remark.eventId);
      });
  });
});
router.get('/:id/increment', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, remark) => {
    if (err) return next(err);
    res.redirect('/events/' + remark.eventId);
  });
});

router.get('/:id/decrement', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, remark) => {
    if (err) return next(err);
    res.redirect('/events/' + remark.eventId);
  });
});
module.exports = router;