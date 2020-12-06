import { bench, read, split } from '@util';
import { day, year } from '.';
import { calcDistance, calcPath } from './part_one';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const calculatedPaths = split(input).map(calcPath);

	const path1 = calculatedPaths[0];
	const path2 = calculatedPaths[1];
	const len = path1.length;

	let fewestSteps = 99999;

	path1.forEach((path, i) => {
		if (path.x === 0 && path.y === 0) return;
		if (path2.some((val) => val.x === path.x && val.y === path.y)) {
			const steps1 = i;
			const steps2 = path2
			.findIndex((p) => p.x === path.x && p.y === path.y);
			const steps = steps1 + steps2;

			fewestSteps = Math.min(fewestSteps, steps);
		}
	});

	return fewestSteps
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}