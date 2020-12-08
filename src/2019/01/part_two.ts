import { bench, read } from '@lib';
import { inputToNumbers } from '@lib/util';
import { day, year } from '.';
import { calc } from './part_one';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return inputToNumbers(input)
		.map((val: number) => calc(val, true))
		.reduce((a, b) => a + b);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
