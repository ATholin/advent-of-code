import { bench, read } from '@util';
import { day, year } from '.';
import { iterate } from './part_one';

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const [start, end] = input.split('-')
	return iterate(start, end, true)
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}