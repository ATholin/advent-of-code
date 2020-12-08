import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

/**
 * Sort the array and check if they're equal.
 * If they are, the numbers are not decreasing.
 *
 * @param {string} nums
 */
const checkIncreasing = (nums) => nums.split('').toString() === nums.split('').sort().toString();

const checkPassword = (number, part2 = false) => {
	const str = number.toString();
	const res = str.match(/(\d)\1+(?!\1)/g);

	if (!checkIncreasing(str)) return false;

	if (res == null) return false;

	if (part2 && res.filter((v) => v.length === 2).length === 0) return false;

	return true;
};

export const iterate = (start: string, end: string | number, part2 = false): number => {
	let count = 0;

	for (let i = start; i <= end; i += 1) {
		if (checkPassword(i, part2)) count += 1;
	}

	return count;
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const [start, end] = input.split('-');
	return iterate(start, end);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
