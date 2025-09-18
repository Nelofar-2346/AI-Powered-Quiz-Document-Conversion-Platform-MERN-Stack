const mongoose = require('mongoose');
const AssignmentSchema = new mongoose.Schema({
  title: String,
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  description: String,
  attachments: [ { filename: String, path: String, mime: String } ],
  solutions: String, // stored text or reference
  dueDate: Date
}, { timestamps: true });
module.exports = mongoose.model('Assignment', AssignmentSchema);
