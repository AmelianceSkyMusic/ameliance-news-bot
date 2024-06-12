import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Context } from 'grammy';

export async function sendPromptGemini(prompt: string, ctx: Context) {
   const { GOOGLE_GEMINI_API } = process.env;
   if (!GOOGLE_GEMINI_API) throw new Error('GOOGLE_GEMINI_API is missing!');
   ctx.reply('5');
   const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API);
   ctx.reply('4');
   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
   ctx.reply('3');
   const result = await model.generateContent(prompt);
   ctx.reply('2');
   const text = result.response.text();
   console.log('text: ', text);
   ctx.reply('1');
   return text;
}
