import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

interface BusI {
	id: number;
	remainder: number;
	index: number;
}

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const bIDs = input.split('\n')[1];

	const buses = bIDs
		.split(',')
		.map(
			(id: string, index: number): BusI => ({
				id: parseInt(id),
				remainder: parseInt(id) - index,
				index: index,
			})
		)
		.filter((bus: BusI) => !isNaN(bus.id));

	let jump = buses[0].id,
		i = buses[0].id;

	buses.slice(1).forEach((bus: BusI) => {
		while ((i + bus.index) % bus.id != 0) {
			i += jump;
		}

		jump *= bus.id;
	});

	return i;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
