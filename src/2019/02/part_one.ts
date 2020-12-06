import { bench, read } from '@util';
import { IntCode } from 'util/intcode/intcode';
import { inputToNumbers } from 'util/util';
import { day, year } from '.';

/**
 * UTILITIES
 */

 /**
 * RUNNER
 */

export const runner = (input: string): number => {
	const position1: number = 12
	const position2: number = 2

	return new IntCode(input)
		.setAtPosition(1, position1)
		.setAtPosition(2, position2)
		.execute()
		.getAtPosition(0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}