// minimal wrapper using fetch or openai package
const OpenAI = require('openai'); // npm i openai
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateStructured(prompt) {
  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini', // pick available model
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1200
  });
  const txt = res.choices[0].message.content;
  try { return JSON.parse(txt); } catch(e) { 
    // fallback: try to extract a JSON block
    const jsonMatch = txt.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : txt;
  }
}
module.exports = { generateStructured };
