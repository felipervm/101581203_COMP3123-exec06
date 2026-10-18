const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    noteTitle: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true
    },
    noteDescription: {
      type: String,
      required: [true, 'Note description is required'],
      trim: true
    },
    priority: {
      type: String,
      enum: ['HIGH', 'MEDIUM', 'LOW'],
      default: 'MEDIUM'
    },
    dateAdded: {
      type: String,
      required: true
    },
    dateUpdated: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Note', noteSchema);
