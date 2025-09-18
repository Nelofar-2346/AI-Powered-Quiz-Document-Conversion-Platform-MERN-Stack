const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctIndex: Number,
  explanation: String
});
const QuizSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  title: String,
  questions: [QuestionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Quiz', QuizSchema);
