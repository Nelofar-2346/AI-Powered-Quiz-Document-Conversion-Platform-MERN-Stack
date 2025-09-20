import React, { useState } from 'react';
import api from '../services/api';

export default function QuizBuilder({ topicId }) {
  const [prompt, setPrompt] = useState('');
  const [numQ, setNumQ] = useState(5);
  const [quiz, setQuiz] = useState(null);

  async function gen() {
    const res = await api.post('/quizzes/generate', { topicId, prompt, numQuestions: numQ });
    setQuiz(res.data);
  }

  return (
    <div>
      <h2>AI Quiz Builder</h2>
      <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Enter topic/prompt" />
      <input type="number" value={numQ} onChange={e=>setNumQ(e.target.value)} />
      <button onClick={gen}>Generate</button>
      {quiz && quiz.questions && quiz.questions.map((q,i)=>(
        <div key={i}>
          <b>{i+1}. {q.text}</b>
          <ul>{q.options.map((o,idx)=>(<li key={idx}>{o}</li>))}</ul>
          <div>Explanation: {q.explanation}</div>
        </div>
      ))}
    </div>
  );
}
