import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // You can change to your preferred theme

export const useMarkdown = () => {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        highlight: (str: string, lang: string): string => {
            const highlighted = lang && hljs.getLanguage(lang)
                ? hljs.highlight(str, { language: lang }).value
                : md.utils.escapeHtml(str);

            return `<pre class="hljs-block"><code class="hljs language-${lang}">${highlighted}</code></pre>`;
        },
    });

    const renderMarkdown = (text: string): string => {
        return md.render(text);
    };

    return { renderMarkdown };
};
