import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

interface Planets {
	[key: string]: unknown;
}

/**
 * Set up the `planets` object
 *
 * @param {string} input Input data
 */
export const setup = (input: string): Planets => {
	const arr = input
		.trim()
		.split('\n')
		.map((l) => l.split(')'));

	const planets = {};
	arr.forEach((line) => {
		const [planet, orbiter] = line;

		if (!planets[planet]) planets[planet] = { name: planet, children: [] };
		if (!planets[orbiter]) planets[orbiter] = { name: orbiter, children: [] };

		planets[planet].children.push(planets[orbiter]);
	});

	return planets;
};

/**
 * Count direct and indirect orbits
 *
 * @param {object} start Starting planet
 * @param {number} i Starting count, defaults to 0
 */
const countOrbits = (start, i = 0) => {
	if (!start.children.length) return i;

	return i + start.children.map((c) => countOrbits(c, i + 1)).reduce((a, b) => a + b);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return countOrbits(setup(input)['COM']);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
