const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const aiClient = require('../utils/aiClient'); // wrapper to call LLM

// Create an AI-generated quiz for a topic prompt
router.post('/generate', async (req, res) => {
  try {
    const { topicId, prompt, numQuestions = 5, difficulty='medium' } = req.body;
    // send prompt to AI
    const aiPrompt = `Create ${numQuestions} multiple choice questions on "${prompt || topicId}".
      For each question return: question text, 4 options, index of correct option, short explanation. Output as JSON array.`;
    const aiResp = await aiClient.generateStructured(aiPrompt);
    // aiResp should be parsed into questions array
    const questions = aiResp; // assume parsed
    const quiz = await Quiz.create({ topic: topicId, title: `Auto: ${prompt}`, questions, createdBy: req.userId });
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('err');
  }
});
module.exports = router;
