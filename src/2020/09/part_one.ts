import { bench, inputToNumbers, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

const hasTwoSum = (sum: number, arr: number[]): boolean => {
	const hash: Set<number> = new Set<number>();

	for (const i in arr) {
		const val: number = arr[i];

		const diff = sum - val;

		if (hash.has(diff)) {
			return true;
		}

		hash.add(val);
	}

	return false;
};

const getFirstInvalid = (index: number, values: number[], check: number): number => {
	if (index == values.length) return -1;
	if (index < check) return getFirstInvalid(index + 1, values, check);

	const val = values[index];
	const toCheck = values.slice(index - check, index);

	return hasTwoSum(val, toCheck) ? getFirstInvalid(index + 1, values, check) : val;
};

/**
 * RUNNER
 */

export const runner = (input: string, check: number): number => {
	const values = inputToNumbers(input);

	return getFirstInvalid(0, values, check);
};

if (require.main === module) {
	(async () =>
		console.log(
			`Result: ${await bench(read(year, day), (input: string) => runner(input, 25))}`
		))();
}
