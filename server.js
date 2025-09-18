const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const topics = require('./routes/topics');
const quizzes = require('./routes/quizzes');
const convert = require('./routes/convert');
const ai = require('./routes/ai');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/topics', topics);
app.use('/api/quizzes', quizzes);
app.use('/api/convert', convert);
app.use('/api/ai', ai);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(()=> {
  app.listen(PORT, ()=>console.log('Server running on', PORT));
}).catch(err => console.error(err));