import { asc, bench, inputToNumbers, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

const differences = (jolt: number, index: number, arr: number[]): number => {
	if (index >= arr.length) return 0;

	if (arr[index] + jolt === arr[index + 1]) return 1 + differences(jolt, index + 1, arr);
	return differences(jolt, index + 1, arr);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const values = inputToNumbers(input).sort(asc);
	const adapters = [0, ...values, values[values.length - 1] + 3];

	return differences(1, 0, adapters) * differences(3, 0, adapters);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'input.txt'), runner)}`))();
}
