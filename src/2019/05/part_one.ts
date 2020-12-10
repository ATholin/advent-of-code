import { bench, read } from '@lib';
import IntCode from '@lib/intcode';
import { day, year } from '.';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return new IntCode(input)
		.withInput(1)
		.execute()
		.getOutput();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
