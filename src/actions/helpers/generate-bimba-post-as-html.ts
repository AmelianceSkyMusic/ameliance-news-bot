import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { sendPromptGemini } from '../../shared/helpers/send-prompt-gemini';

import { Context } from 'grammy';

const generatePrompt = ({ text }: Record<string, string>) => `
Уяви, що ти мегаблогер в соціальній мережі. У тебе 2 мільярди послідовувачів.
Кожен твій пост з новиною збирає мільярди лайків.

Я буду присилати тобі інформацію для посту у вигляді тексту.
Там можуть бути тексти з анонсами інших статей чи якесь сміття, яке випадково потрапило в текст статті, але ти не звертай на нього увагу.

Твоя задача переписати текст статті так щоб вона було українською мовою, але не просто переклад, а щоб люди були в щоці від новини, щоб людина прочитавши одночасно і зраділа і засумувала і найбільше посміялась. Але це має бути завуальовано, не потрібно про це прямо писати. Якщо це політична новина, то не бажано висміювати високопосадових політиків.

У відповідь ти маєш написати вже переписаний текст обов'язково українською мовою, без коментарів та запитань.
Обов'язково переклади, будь ласка, статтю на українську обов'язково, якою б мовою не був написаний оригінал статті.
Кількість символів в тексті має бути до 800 знаків, не більше, але чим менше тим краще.
Обов'язково користуйся емозді, обов'язково в заголовку і також в тексті. Теги обов'язково напиши у форматі ПаскальКейсі. В тегах не можна використовувати нижні підкреслення та дефіс

Структура посту має бути така:
Спочатку клікбейт заголовок, можна великими літерами
Потім сам контент, від одного до трьох абзаців
Потім теги

Заголовок відділи пустим рядком від контенту
Абзаци контенту розділюй пустим рядком між собою
Теги відділи від контенту пустим рядком

Ось текст:
${text}

Пам'ятай, стаття обов'язково повинна бути перекладена на українську мову.
А факти статті не перекручені
`;

export async function generateBimbaPostAsHTML(text: string, ctx: Context) {
   try {
      const prompt = generatePrompt({ text });
      console.log('4 prompt: ', prompt);
      ctx.reply('...sent a Gemini prompt...');
      let geminiAnswer = await sendPromptGemini(prompt);
      console.log('5 geminiAnswer: ', geminiAnswer);
      ctx.reply(`...received a response with the number of characters: ${geminiAnswer.length}...`);

      //* If the answer exceeds the character limit, try again or return when the limit is exceeded again
      if (geminiAnswer.length > 1000) {
         ctx.reply('...character limit exceeded\nSent a second Gemini prompt...');
         geminiAnswer = await sendPromptGemini(prompt);
         console.log('5a geminiAnswer: ', geminiAnswer);
         ctx.reply(
            `...received a response with the number of characters: ${geminiAnswer.length}...`,
         );
      }

      if (geminiAnswer.length > 1000) {
         ctx.reply('...character limit exceeded\nCancel');
         return;
      }
      ctx.reply('...received a response, generate a new post...');

      const titleMatch = geminiAnswer.match(/^(.*)$/m);
      console.log('6 titleMatch: ', titleMatch);
      const articleTitle = titleMatch ? titleMatch[1].trim().replaceAll('*', '') : '';
      console.log('7 articleTitle: ', articleTitle);

      const contentMatch = geminiAnswer.match(/^[^\n]*\n\n([\s\S]*)/m);
      console.log('8 contentMatch: ', contentMatch);
      const articleText = contentMatch ? contentMatch[1].trim() : '';
      console.log('9 articleText: ', articleText);

      return `<b>${articleTitle}</b>\n\n${articleText}\n\n<b><a href="https://t.me/bimba_news">БІМБА-НОВИНИ →</a></b>`;
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
