import { bench, read, permutations as perms } from '@lib';
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
	const permutations = perms([0, 1, 2, 3, 4]);

	return permutations.reduce((acc: number, n: number[]) => {
		const AmpA = new Amplifier(input, 'AmpA').withInput([n[0], 0]);
		const AmpB = new Amplifier(input, 'AmpB').withInput(n[1]);
		const AmpC = new Amplifier(input, 'AmpC').withInput(n[2]);
		const AmpD = new Amplifier(input, 'AmpD').withInput(n[3]);
		const AmpE = new Amplifier(input, 'AmpE').withInput(n[4]);
		const thruster = new Thruster();

		AmpA.connectNextAmplifier(AmpB);
		AmpB.connectNextAmplifier(AmpC);
		AmpC.connectNextAmplifier(AmpD);
		AmpD.connectNextAmplifier(AmpE);
		AmpE.connectThruster(thruster);

		AmpA.execute().sendToNext();
		AmpB.execute().sendToNext();
		AmpC.execute().sendToNext();
		AmpD.execute().sendToNext();
		AmpE.execute().sendToThruster();

		return Math.max(acc, thruster.data);
	}, 0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
