import { asc, bench, inputToNumbers, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

const arrangements = (
	index: number,
	bi: number,
	arr: number[],
	map: Map<number, number>
): number => {
	const current = arr[index];
	if (current === bi) return 1;

	let count = 0;

	for (let i = 1; i <= 3; i++) {
		const next = arr[index + i];
		if (next - current <= 3) {
			if (map.has(index + i)) {
				count += map.get(index + i) ?? 0;
			} else {
				const res = arrangements(index + i, bi, arr, map);
				map.set(index + i, res);
				count += res;
			}
		}
	}

	return count;
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const values = inputToNumbers(input).sort(asc);
	const bi = values[values.length - 1] + 3;
	const adapters = [0, ...values, bi];

	return arrangements(0, bi, adapters, new Map<number, number>());
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
