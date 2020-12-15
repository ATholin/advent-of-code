import { bench, read } from '@lib';
import { day, year } from '.';
import { runner as part_one } from './part_one';

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return part_one(input, 30000000);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
