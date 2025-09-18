const mongoose = require('mongoose');
const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Topic', TopicSchema);
