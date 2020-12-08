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
	const position1 = 12;
	const position2 = 2;

	return new IntCode(input)
		.setAtPosition(1, position1)
		.setAtPosition(2, position2)
		.execute()
		.getAtPosition(0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
