import { bench, read, split } from '@lib';
import { Vec2Like } from '@lib/model';
import { Vec2Like } from 'util/model';
import { day, year } from '.';

/**
 * UTILITIES
 */
export const calcPath = (path: string): Vec2Like[] => {
	const p = [
		{
			x: 0,
			y: 0,
		},
	];

	path.split(',').forEach((step) => {
		const dir: string = step[0];
		const c = Number(step.slice(1));

		switch (dir) {
			case 'U':
				for (let i = 0; i < c; i += 1) {
					p.push({
						x: p[p.length - 1].x,
						y: p[p.length - 1].y + 1,
					});
				}
				break;
			case 'D':
				for (let i = 0; i < c; i += 1) {
					p.push({
						x: p[p.length - 1].x,
						y: p[p.length - 1].y - 1,
					});
				}
				break;
			case 'R':
				for (let i = 0; i < c; i += 1) {
					p.push({
						x: p[p.length - 1].x + 1,
						y: p[p.length - 1].y,
					});
				}
				break;
			case 'L':
				for (let i = 0; i < c; i += 1) {
					p.push({
						x: p[p.length - 1].x - 1,
						y: p[p.length - 1].y,
					});
				}
				break;
			default:
				break;
		}
	});

	return p;
};

export const calcDistance = (pos: Vec2Like): number => Math.abs(pos.x) + Math.abs(pos.y);

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const calculatedPaths = split(input).map(calcPath);

	const path1 = calculatedPaths[0];
	const path2 = calculatedPaths[1];

	let closest = 99999;

	path1.forEach((path) => {
		if (path.x === 0 && path.y === 0) return;
		if (path2.some((val) => val.x === path.x && val.y === path.y)) {
			const distance = calcDistance(path);
			closest = Math.min(closest, distance);
		}
	});

	return closest;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
