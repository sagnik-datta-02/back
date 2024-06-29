const express = require('express');
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({ apiKey: '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' });

// const router = express.Router();

app.post('/generate-questions', async (req, res) => {
//   const userMessage = "Create a list of 8 questions for an interview with a science fiction author.";

  try {
    const response = await openai.chat.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Create a list of 5 questions for an interview with an IT recruiter" },
        // { role: "user", content: userMessage },
      ],
      temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
    });

    const assistantReply = response.choices[0].message.content;
    res.json({ questions: assistantReply.split('\n') });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});