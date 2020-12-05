import { bench, read, split } from '@util';
import { asc, desc } from 'util/util';
import { day, year } from '.';
import { BoardingPass } from './part_01';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const passes: BoardingPass[] = split(input).map((seat: string) => new BoardingPass(seat))
	const seatIDs: number[] = passes.map((v: BoardingPass) => v.calculateSeatID())

	const sorted = seatIDs.sort(asc)
	console.log(sorted.filter((v, i) => sorted[i-1] != v-1 || sorted[i + 1] != v+1))
	
	return seatIDs.sort(desc)[0]
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}