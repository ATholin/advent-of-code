import { bench, read } from '@lib';
import IntCode from '@lib/intcode';
import { day, year } from '.';

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return new IntCode(input).withInput(2).execute().getOutput();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
