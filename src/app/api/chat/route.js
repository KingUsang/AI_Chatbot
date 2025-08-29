// app/api/chat/route.js
import {NextResponse} from 'next/server';
import Groq from 'groq-sdk';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import mk from 'markdown-it-katex';

// Setup Groq
const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY
});

// Setup MarkdownIt with syntax highlighting + Math
function normalizeMathDelimiters(text) {
  return text
    // Inline: \( ... \) → $...$
    .replace(/\\{1,2}\(([\s\S]+?)\\{1,2}\)/g, (_, content) => `$${content.trim()}$`)
    // Display: \[ ... \] → $$...$$
    .replace(/\\{1,2}\[([\s\S]+?)\\{1,2}\]/g, (_, content) => `$$${content.trim()}$$`);
}

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return `<pre class="hljs"><code>${
					hljs.highlight(str, {language: lang}).value
				}</code></pre>`;
			} catch (__) {}
		}
		return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
	}
});
md.use(mk); // Enable LaTeX math rendering

export async function POST(req) {
	try {
		const {messages} = await req.json();

		// Query Groq (AI returns Markdown by default)
		const completion = await groq.chat.completions.create({
			model: 'gemma2-9b-it',
			messages: [
				...messages,
				/*{
					role: 'system',
					content:
						'Always return responses in Markdown. Put code inside fenced code blocks (```lang). Return inline math wrapped in $...$ and block math wrapped in $$...$$. Do not use \[...\] or bare LaTeX without delimiters."'
				}*/
			],
			temperature: 1
		});

		const message = completion.choices[0].message;
		// Take the AI’s markdown text
		//const markdown = message.content;

		// Convert to formatted HTML
		//const html = md.render(normalizeMathDelimiters(markdown));
		return NextResponse.json(message);
	} catch (error) {
		console.error(error);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
