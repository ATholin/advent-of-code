import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

interface EarliestDeparture {
	id: number;
	timestamp: number;
}

const earliest = (ids: number[], timestamp: number): EarliestDeparture => {
	const filtered = ids.filter((id: number) => {
		return timestamp % id === 0;
	});

	return filtered.length > 0
		? {
				id: filtered[0],
				timestamp,
		  }
		: earliest(ids, timestamp + 1);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const [ts, bIDs] = input.split('\n');
	const timestamp = parseInt(ts, 10);
	const IDs = bIDs
		.split(',')
		.filter((id: string) => id !== 'x')
		.map((id: string) => parseInt(id, 10));

	const e = earliest(IDs, timestamp);
	return e.id * (e.timestamp - timestamp);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
