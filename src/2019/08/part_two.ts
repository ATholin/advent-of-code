import { bench, chunk, read } from '@lib';
import { day, year } from '.';
import { COLORS } from './part_one';

/**
 * UTILITIES
 */

const draw = (data) => data.map((p) => p.map((c) => COLORS[c]).join('')).join('\n');

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const layers: string[][] = chunk([...input], 25 * 6);
	const image = Array(25 * 6).fill(2);

	layers.forEach((c: string[]) => {
		c.forEach((p: string, i: number) => {
			if (image[i] === 2) {
				image[i] = parseInt(p, 10);
			}
		});
	});

	return draw(chunk(image, 25));
};

if (require.main === module) {
	(async () => console.log(`Result: \n${await bench(read(year, day), runner)}`))();
}
