import { bench, read, split } from '@util';
import { sum } from 'util/util';
import { day, year } from '.';

/**
 * UTILITIES
 */

 /**
 * RUNNER
 */

export const runner = (input: string): number => {
	return input.split('\n\n').map((group: string) => {
		return new Set(group.replace(/\r?\n/g, "")).size
	}).reduce(sum)
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}