import { handleAppError } from '../../shared/helpers/handle-app-error';
import { prepareEditMessageText } from '../../shared/helpers/prepare-edit-message-text';
import { replyError } from '../../shared/helpers/reply-error';
import { sendPromptGemini } from '../../shared/helpers/send-prompt-gemini';

import { Context } from 'grammy';

const getTitle = (title: string) =>
   `Як підказку про що саме шукати текст даю тобі заголовок: ${title}`;

const generatePrompt = ({ title, text }: Record<string, string>) => `
Уяви, що ти мегаблогер в соціальній мережі. У тебе 2 мільярди послідовувачів.
Кожен пост з новиною збирає мільярди лайків.

Я буду присилати тобі інформацію для посту у вигляді тексту.
Там можуть бути тексти з анонсами інших статей чи якесь сміття, яке випадково потрапило в текст статті, але ти не звертай на нього увагу.
${title ? getTitle(title) : ''}

Твоя задача переписати текст статті так щоб вона було українською мовою, але не просто переклад, а щоб люди були в щоці від новини.
У відповідь ти маєш написати вже переписаний текст обов'язково українською мовою, без коментарів та запитань.
Обов'язково переклади, будь ласка, статтю на українську обов'язково, якою б мовою не був написаний оригінал статті.
Кількість символів в тексті має бути обов'язково до 500 знаків, не більше, але чим менше тим краще.
Обов'язково користуйся емозді, обов'язково в заголовку і також в тексті.
Теги обов'язково напиши у форматі ПаскальКейсі. В тегах не можна використовувати нижні підкреслення, дефіс та інші спеціальні символи в тому числі апостроф

Структура посту має бути така:
Спочатку клікбейт заголовок, великими літерами
Потім сам контент, від одного до трьох абзаців
Потім теги

Заголовок відділи пустим рядком від контенту
Абзаци контенту розділюй пустим рядком між собою
Теги відділи від контенту пустим рядком

Ось текст:
${text}

Пам'ятай, стаття обов'язково повинна бути перекладена на українську мову.
А факти статті не перекручені.
`;

const getGeminiAnswer = async (
   prompt: string,
   updateMessageText: (text: string) => Promise<unknown>,
   enterCount = 0,
   deep = 10,
): Promise<string | void> => {
   if (enterCount > deep) return;
   enterCount++;
   console.time('getGeminiAnswer');
   const geminiAnswer = await sendPromptGemini(prompt);
   console.timeEnd('getGeminiAnswer');
   updateMessageText(
      `...received a response with the number of characters: ${geminiAnswer.length}...`,
   );
   if (geminiAnswer.length > 1000) {
      updateMessageText(`...character limit exceeded\nSent an another Gemini prompt...`);
      return await getGeminiAnswer(prompt, updateMessageText, enterCount);
   }
   return geminiAnswer;
};

export async function generateBimbaPostAsHTML(
   ctx: Context,
   { text, title = '' }: { text: string; title?: string },
) {
   try {
      const prompt = generatePrompt({ title, text });
      const notificationMsg = await ctx.reply('...sent a Gemini prompt...');
      const updateMessageText = await prepareEditMessageText(ctx, notificationMsg);

      const geminiAnswer = await getGeminiAnswer(prompt, updateMessageText);
      if (!geminiAnswer) {
         updateMessageText('...cancel');
         return;
      }

      updateMessageText('...received a response, generate a new post...');

      const titleMatch = geminiAnswer.match(/^(.*)$/m);
      const articleTitle = titleMatch ? titleMatch[1].trim().replaceAll('*', '') : '';

      const contentMatch = geminiAnswer.match(/^[^\n]*\n\n([\s\S]*)/m);
      const articleText = contentMatch ? contentMatch[1].trim() : '';
      updateMessageText('...return post!');

      return `<b>${articleTitle}</b>\n\n${articleText}\n\n<b><a href="https://t.me/bimba_news">БІМБА-НОВИНИ →</a></b>`;
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
