var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title : { type: String, required: true },
    summary: String, 
    host: String,
    start_date: Date,
    end_date: Date,
    event_category: [ String ],
    location: [ String ],
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
    // ref is used to populate the document
    remark: [{ type: Schema.Types.ObjectId, ref: 'Remark' }],
 // remarks doesn't require because it is necessary, An articles may have remarks or they have not comments

}, { timestamps: true });

// This event is used to perform the crud operation and capture it in router event.js
module.exports = mongoose.model('Event', eventSchema); // model is equivalent to colletions
