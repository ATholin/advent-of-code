import { inputToStrings } from '@lib';
import { Vec2 } from '@lib/model';

export enum Seat {
	OCCUPIED = '#',
	FLOOR = '.',
	EMPTY = 'L',
}

export interface SeatMap {
	map: Map<string, Seat>;
	width: number;
	height: number;
}

export const parse = (input: string): SeatMap => {
	const lines = inputToStrings(input).map((row: string) => row.split(''));
	const seats = new Map<string, Seat>();
	let y = 0;

	const height = lines.length;
	const width = lines[0].length;

	lines.forEach((line: string[]) => {
		let x = 0;
		line.forEach((letter: string) => {
			const v = new Vec2(x, y);
			if (letter !== Seat.FLOOR) {
				seats.set(v.toString(), letter as Seat);
			}
			x++;
		});
		y++;
	});

	return {
		map: seats,
		width: width,
		height: height,
	};
};
