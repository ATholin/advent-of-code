import { bench, read } from '@lib';
import { sum } from '@lib/util';
import { day, year } from '.';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return input
		.split('\n\n')
		.map((group: string) => group.split('\n'))
		.map((group: string[]) => {
			const groupString = group.join('');
			const groupAnswers = [...groupString]
				.reduce(
					(map, val) => map.set(val, (map.get(val) ?? 0) + 1),
					new Map<string, number>()
				)
				.values();

			return [...groupAnswers].filter((v) => v === group.length).length;
		})
		.reduce(sum);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
