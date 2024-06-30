const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const updateRoutes = require('./router/updateRoutes/courseupdate');
const getRoutes = require('./router/getRoutes/dashboard');
const deleteRoutes = require('./router/deleteRoutes/deleteAll');

const app = express();
const PORT = process.env.PORT || 5000;

const { ChatPromptTemplate } =require( "@langchain/core/prompts");
const { ChatAnthropic } = require('@langchain/anthropic');
const { AgentExecutor, createToolCallingAgent } = require('langchain/agents');
const { TavilySearchResults } = require('@langchain/community/tools/tavily_search');


app.use(express.json());
app.use(cors());

app.use('/update',updateRoutes);

app.use('/get',getRoutes);
app.use('/delete',deleteRoutes);

app.post('/generate-questions', async (req, res) => {
  const { topic, difficulty } = req.body;
  console.log(topic);

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const model = new ChatAnthropic({
      temperature: 0.9,
      model: "claude-3-5-sonnet-20240620",
      apiKey: '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',
      maxTokens: 1024,
    });

    const assistantReply = await model.invoke(`Think yourself as an Technical Interviewer and Give 1 interview questions on ${topic} of difficulty level ${difficulty} . Only give the question.`);

    if (assistantReply && assistantReply.lc_kwargs && assistantReply.lc_kwargs.content) {
      res.json({ questions: assistantReply.lc_kwargs.content });
    } else {
      throw new Error('Invalid response from the model');
    }
  } catch (error) {
    console.error('Anthropic API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/generate-feedback', async (req, res) => {
 
  
    try {
      const { scoreType, currentScore } = req.body;
      const userMessage = `Suggest some steps to improve ${scoreType} score from ${currentScore}%% to 95%%`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You will be provided with scores of eye contact, confidence , boldness or clarity of a person attending the interview. Your task is to generate human like suggestions to improve the score in a paragraph about 70 words."
          },
          {
            "role": "user",
            "content": userMessage
          }
        ],
        temperature: 0.7,
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
