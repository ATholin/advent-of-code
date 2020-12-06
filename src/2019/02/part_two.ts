import { bench, read } from '@util';
import { IntCode } from 'util/intcode/intcode';
import { day, year } from '.';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	for (let i = 0; i < 100; i += 1) {
		for (let j = 0; j < 100; j += 1) {
		  const ic = new IntCode(input);
		  ic.setAtPosition(1, i).setAtPosition(2, j);
	
		  if (ic.execute().getAtPosition(0) === 19690720) {
			return (100 * i) + j;
		  }
		}
	  }
	
	  return -1;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}