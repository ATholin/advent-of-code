import { asc, bench, inputToNumbers, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

const getContiguous = (sum: number, arr: number[]): number => {
	for (const i in arr) {
		let currentSum = arr[i];
		let index = Number(i) + 1;

		while (index <= arr.length) {
			if (currentSum == sum) {
				const sorted = arr.slice(Number(i), index).sort(asc);
				return sorted[0] + sorted[sorted.length - 1];
			}

			if (currentSum > sum || index == arr.length) {
				break;
			}

			currentSum += arr[index];
			index++;
		}
	}

	return -1;
};

/**
 * RUNNER
 */

export const runner = (input: string, sum: number): number => {
	const values = inputToNumbers(input);

	return getContiguous(sum, values);
};

if (require.main === module) {
	(async () =>
		console.log(
			`Result: ${await bench(read(year, day), (input: string) => runner(input, 14144619))}`
		))();
}
