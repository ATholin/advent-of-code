import { bench, read, split } from '@lib';
import { desc } from '@lib/util';
import { day, year } from '.';

/**
 * UTILITIES
 */

export interface BSP {
	low: number;
	high: number;
	value: string;
}

export class BoardingPass {
	row: number[];
	column: number[];

	constructor(seat: string) {
		const values: string[] = seat.split('');
		this.row = values.slice(0, 7).map((val: string) => (val === 'F' ? 0 : 1));
		this.column = values.slice(7).map((val: string) => (val === 'L' ? 0 : 1));
	}

	calculateColumn(): number {
		return this.traverse(0, 7, this.column, 0);
	}

	calculateRow(): number {
		return this.traverse(0, 127, this.row, 0);
	}

	traverse(low: number, high: number, seat: number[], index: number): number {
		const val = seat[index];
		const diff = high - low;
		const halfDiff = Math.ceil(diff / 2);

		if (diff == 1) return low + val;

		return this.traverse(low + halfDiff * val, high - halfDiff * (1 - val), seat, index + 1);
	}

	calculateSeatID(): number {
		return this.calculateRow() * 8 + this.calculateColumn();
	}
}

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const passes: BoardingPass[] = split(input).map((seat: string) => new BoardingPass(seat));
	const seatIDs: number[] = passes.map((v: BoardingPass) => v.calculateSeatID());

	return seatIDs.sort(desc)[0];
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
