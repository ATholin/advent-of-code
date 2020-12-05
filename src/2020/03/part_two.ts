import { bench, read, split } from '@util';
import { Vec2Like } from 'util/model';
import { day, year } from '.';
import { walk } from './part_one';

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const map: string[][] = split(input).map(row => row.split(""));

	let slopes: Vec2Like[] = [
		{ x: 1, y: 1 },
		{ x: 3, y: 1 },
		{ x: 5, y: 1 },
		{ x: 7, y: 1 },
		{ x: 1, y: 2 },
	];

	return slopes.map(slope => walk(map, { x: 0, y: 0 }, slope)).reduce((acc, trees) => acc * trees);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}