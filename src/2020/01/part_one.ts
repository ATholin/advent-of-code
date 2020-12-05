import { bench, read } from '@util';
import { inputToNumbers } from 'util/util';
import { day, year } from '.';

export const runner = (input: string): number => {
	const values: number[] = inputToNumbers(input);
	const hash: Set<number> = new Set<number>();

	for (const i in values) {
		const val: number = values[i];

		const diff = 2020 - val;

		if (hash.has(diff)) {
			return diff * val;
		}

		hash.add(val);
	}

	return 0
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}