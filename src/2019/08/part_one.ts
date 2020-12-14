import { bench, chunk, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

export const COLORS = {
	0: ' ',
	1: '█',
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const chunked = chunk([...input], 25 * 6);

	const l0: string[] = chunked.reduce((acc: string[], n: string[]): string[] => {
		const acc0 = acc.filter((o: string) => o === '0').length;
		const n0 = n.filter((o: string) => o === '0').length;
		return acc0 < n0 ? acc : n;
	});

	return l0.filter((o) => o === '1').length * l0.filter((o) => o === '2').length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
