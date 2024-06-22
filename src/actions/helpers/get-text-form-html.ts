import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';

import { Context } from 'grammy';

export function getTextFromHTML(ctx: Context, htmlContent: string) {
   try {
      //* Remove <script>...</script> blocks
      const withoutScript = htmlContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

      //* Remove <style>...</style> blocks
      const withoutStyle = withoutScript.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

      //* Remove inline styles and scripts (e.g., <div style="..."> or <a href="..." onclick="...">)
      const withoutInlineCSSAndJS = withoutStyle.replace(
         /\s*(style|onclick|onload|onmouseover|onmouseout|onchange|onsubmit|onfocus|onblur|onkeyup|onkeydown)="[^"]*"/gi,
         '',
      );

      //* Remove all remaining HTML tags
      const textContent = withoutInlineCSSAndJS.replace(/<[^>]*>?/gm, '');

      return textContent;
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
