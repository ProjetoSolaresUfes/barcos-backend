import { Response } from 'express';
import OpenAI from 'openai'
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function gptResponse(promptText: string, res: Response) {
  if(!promptText) {
    res.end();
    throw new Error('No prompt text');
  }
  console.log('Prompt text', promptText);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: promptText}],
      temperature: 0.9,
      stream: true,
    });
  
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        console.log(content);
        res.write(content);
      }
    }
    
    console.log('Stream finished');
    res.end();
  }
  catch (error) {
    console.error('Error in gptResponse', error);
    throw error;
  }
}