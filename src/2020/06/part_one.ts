import { bench, read } from '@lib';
import { sum } from '@lib/util';
import { day, year } from '.';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return input
		.split('\n\n')
		.map((group: string) => {
			return new Set(group.replace(/\r?\n/g, '')).size;
		})
		.reduce(sum);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
