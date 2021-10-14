var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dateSortSchema = new Schema(
  {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Datesort', dateSortSchema);

 