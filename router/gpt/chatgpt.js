const express = require('express');
//const OpenAI = require('openai');
const app = express();
import { ChatAnthropic } from "@langchain/anthropic";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
//const openai = new OpenAI({ apiKey: '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' });
const llm = new ChatAnthropic({
  model: "claude-3-sonnet-20240229",
  temperature: 0,
  apiKey:'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',
});
// const router = express.Router();

app.post('/generate-questions', async (req, res) => {
//   const userMessage = "Create a list of 8 questions for an interview with a science fiction author.";

  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful assistant"],
      ["placeholder", "{chat_history}"],
      ["human", "{input}"],
      ["placeholder", "{agent_scratchpad}"],
    ]);
    const tools = [new TavilySearchResults({ maxResults: 1 })];
    const agent = await createToolCallingAgent({
      llm,
      tools: tools,
      prompt,
    });
    const agentExecutor = new AgentExecutor({
      agent,
      tools: tools,
    });
    
    const input = "Give 3 question on react";
    const { assistantReply } = await agentExecutor.invoke({ input });
    
    res.json({ questions: assistantReply.split('\n') });
  } catch (error) {
    console.error('Anthropic API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});