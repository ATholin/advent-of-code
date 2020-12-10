import { bench, read } from '@lib';
import { day, year } from '.';
import { setup } from './part_one';

/**
 * UTILITIES
 */

/**
 * Check whether planet is orbiting the starting planet
 *
 * @param {object} start Starting planet
 * @param {object} planet Planet to search for
 */
const find = (start, planet) => {
	if (start.children.find((p) => p.name === planet.name)) return true;

	// Returns whether one of the children has the planet
	// Map: returns array of booleans
	// Some: If any of the elements match predicate, return true
	return start.children.map((c) => find(c, planet)).some((p) => p === true);
};

/**
 * Get the planet where the path splits
 * In the example, this would be planet `D`
 *
 * @param {object} start Starting planet
 * @param {object} p1 Planet 1
 * @param {object} p2 Planet 2
 *
 * @returns {object} The matching planet
 */
const findSplit = (start, p1, p2) => {
	// If we cant reach both of the planets from the current planet
	if (!find(start, p1) || !find(start, p2)) return false;

	const res = start.children.map((c) => findSplit(c, p1, p2));

	// If any of the children return the `start`
	if (res.some((p) => p !== false)) {
		return res.find((p) => p !== false);
	}

	return start;
};

/**
 * Count the steps from `start` to `planet`
 *
 * @param {object} start Starting planet
 * @param {object} planet Planet to count the steps until
 *
 * @returns {number} The number of steps taken
 */
const steps = (start, planet) => {
	if (start.children.find((c) => c.name === planet.name)) return 0;
	return (
		1 +
		steps(
			start.children.find((c) => find(c, planet)),
			planet
		)
	);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const planets = setup(input);

	const start = planets['COM'];
	const YOU = planets['YOU'];
	const SAN = planets['SAN'];

	// Find where the path splits
	// In the example, this would be D
	const split = findSplit(start, YOU, SAN);
	return steps(split, SAN) + steps(split, YOU);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
