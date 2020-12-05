import { bench, read, split } from '@util';
import { inputToNumbers } from 'util/util';
import { day, year } from '.';

export const runner = (input: string): number => {
	const values: number[] = inputToNumbers(input);

	for (const i in values) {
		if (values[i] >= 2020) continue;
		for (const j in values) {
			if (values[i] + values[j] >= 2020) continue;
			for (const k in values) {
				if (values[i] + values[j] + values[k] === 2020) {
					return values[i] * values[j] * values[k];
				}
			}
		}
	}

	return 0
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}