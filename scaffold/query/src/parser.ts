import Turndown from 'turndown';
import { parse as parseHtml } from 'node-html-parser';

export const parse = (html: string): string => {
	const descriptions = parseHtml(html)
		.querySelectorAll('.day-desc')
		.map((val: HTMLLIElement) => val.toString())
		.reduce((desc: string, val: string) => desc + val);

	const turndown = new Turndown();
	return turndown.turndown(descriptions);
};
