var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');

router.get('/', function (req, res, next) {
  Event.find({}, (err, events) => {
    if (err) return next(err);

    var allCategories = [];
    events.filter((event) => {
      console.log(event);
      var some = event.event_category;
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
    res.render('events', { events: events, allCategories: allCategories, allLocations: allLocations });
  });
});

// // listing all events
// router.get('/', (req, res, next) => {
//   Event.find({}, (err, Events) => {
//      if(err) return next(err)
//       res.render('events', { Events: Events } )
//     })
// });

// For rendering article and create form => GET on "/books/new"
router.get('/new', (req, res, next) => {
    res.render('addEvent');
});

// send data
router.post('/', (req, res, next) => {
  Event.create(req.body, (err, createEvent) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});

// // Sending data 
// router.post('/', function (req, res, next) {
//     Author.findOne({ author_email: req.body.author_email }, (err, author) => {
//       if (err) return next(err);
//       if (!author) {
//         Author.create(req.body, (err, author) => {
//           req.body.authorId = author._id;
//           Book.create(req.body, (err, book) => {
//             console.log(typeof book.id, typeof book._id);
//             if (err) return next(err);
//             Author.findByIdAndUpdate(
//               author._id,
//               { $push: { booksId: book.id } },
//               { new: true },
//               (err, updatedAuthor) => {
//                 console.log(updatedAuthor);
//                 if (err) return next(err);
//                 res.redirect('/books');
//               }
//             );
//           });
//         });
//       } else {
//         req.body.authorId = author._id;
//         Book.create(req.body, (err, event) => {
//             console.log(typeof book.id, typeof book._id);
//             if (err) return next(err);
//             Author.findByIdAndUpdate(
//                 author._id,
//                 { $push: { booksId: book.id } },
//                 { new: true },
//                 (err, updatedAuthor) => {
//                 console.log(updatedAuthor);
//                 if (err) return next(err);
//                 res.redirect('/books');
//                 }
//             );
//         });
//        }
//     });
// });

// Fetch Single event
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Event.findById(id).populate('remark').exec((err, event) => {
        console.log(event);
        
    res.render('singleEvents', { event: event })
   });
});

// Edit event operation
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    res.render('eventEditForm', { event: event });
  });
});

// Delete Event operation
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Event.findByIdAndDelete(id, (err, events) => {
      if (err) return next(err);
      Event.findByIdAndUpdate(events.authorId, { $pull: { booksId: events._id }},
            (err, author) => {
                res.redirect('/events/');
            }
        );
    });
});
 
router.post('/', (req, res, next) => {
  Event.create(req.body, (err, createEvent) => {
    if (err) return next(err);
    res.redirect('/events/');
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, updateEvent) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});

// increment likes
router.get('/:id/likes', (req, res, next) => {
    var id = req.params.id;
     Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
      if (err) return next(err);
      res.redirect('/events/' + id);
    });
  });

//  increment dislikes
router.get('/:id/dislikes', (req, res, next) => {
    var id = req.params.id;
    Event.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
        if (err) return next(err);
        res.redirect('/events/' + id);
    });  
});

// Remarks send
router.post('/:eventId/remark', (req, res, next) => {

  var eventId = req.params.eventId;
  console.log(req.body);
  req.body.eventId = eventId;
  Remark.create(req.body, (err, remark) => { //newly created remark
    if (err) return next(err);
    Event.findByIdAndUpdate(eventId, { $push: { remark: remark.id }}, (err, updatedEvent) => {
        if (err) return next(err);
        res.redirect('/events/' + eventId);
      });
    });
});

// // This is a articleId because comment hasn't been created
// router.post('/:id/remark', (req, res, next) => {
//     var id = req.params.id;
//     console.log(req.body);
//     Remark.create(id, (err, comment) => {
//         if (err) return next(err);
//         Event.findByIdAndUpdate(eventsId, { $push: { comments: comment.id}}, (err, article) => {
//             if (err) return next(err);
//             res.redirect('/events/' + id); // redirect back to the articledetails.ejs
//         })
//     });  
// });


module.exports = router;