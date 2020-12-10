import { bench, read, permutations as perm } from '@lib';
import { day, year } from '.';
import Amplifier from './amplifier.class';
import Thruster from './thruster.class';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const permutations = perm([5, 6, 7, 8, 9]);

	return permutations.reduce((acc: number, n: number[]) => {
		// console.log(n)
		const AmpA = new Amplifier(input, 'AmpA').withInput([n[0], 0]);
		const AmpB = new Amplifier(input, 'AmpB').withInput(n[1]);
		const AmpC = new Amplifier(input, 'AmpC').withInput(n[2]);
		const AmpD = new Amplifier(input, 'AmpD').withInput(n[3]);
		const AmpE = new Amplifier(input, 'AmpE').withInput(n[4]);

		AmpA.connectNextAmplifier(AmpB);
		AmpB.connectNextAmplifier(AmpC);
		AmpC.connectNextAmplifier(AmpD);
		AmpD.connectNextAmplifier(AmpE);
		AmpE.connectNextAmplifier(AmpA);

		const thruster = new Thruster();
		AmpE.connectThruster(thruster);

		do {
			AmpA.step().sendToNext();
			AmpB.step().sendToNext();
			AmpC.step().sendToNext();
			AmpD.step().sendToNext();
			AmpE.step().sendToMultiple([AmpA, thruster]);
		} while (!AmpE.isHalted());

		return Math.max(thruster.data, acc);
	}, 0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
