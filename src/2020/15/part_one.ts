import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * RUNNER
 */

export const runner = (input: string, stop = 2020): number => {
	const numbers: number[] = input.split(',').map((val: string) => parseInt(val, 10));
	const map = new Map<number, number>();
	let i = 0;
	let spoken = 0;

	while (i < stop) {
		if (i >= numbers.length) {
			if (map.has(spoken)) {
				const lastIndex = map.get(spoken) ?? 0;
				map.set(spoken, i);
				spoken = i - lastIndex;
			} else {
				map.set(spoken, i);
				spoken = 0;
			}
		} else {
			spoken = numbers[i];
			map.set(spoken, i + 1);
		}

		i++;
	}

	return spoken;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
