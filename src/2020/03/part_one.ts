import { bench, read, split } from '@util';
import { Vec2Like } from 'util/model';
import { day, year } from '.';

/**
 * UTILITIES
 */

export const walk = (map: string[][], position: Vec2Like, slope: Vec2Like): number => {
	if (position.y >= map.length) return 0;

	if (map[position.y][position.x % map[0].length] === "#") {
		return 1 + walk(map, { x: position.x + slope.x, y: position.y + slope.y }, slope);
	}

	return walk(map, { x: position.x + slope.x, y: position.y + slope.y }, slope);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const map: string[][] = split(input).map(row => row.split(""));
	return walk(map, { x: 0, y: 0 }, { x: 3, y: 1 });
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}