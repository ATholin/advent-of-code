import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse, Seat, SeatMap } from './parse';

export const directions = [
	new Vec2(0, 1),
	new Vec2(1, 1),
	new Vec2(1, 0),
	new Vec2(1, -1),
	new Vec2(0, -1),
	new Vec2(-1, -1),
	new Vec2(-1, 0),
	new Vec2(-1, 1),
];

const update = (v: Vec2, map: SeatMap): Seat => {
	const nearbyOccupied = directions.filter(
		(dir: Vec2) => map.map.get(v.add(dir).toString()) === Seat.OCCUPIED
	).length;
	const seat = map.map.get(v.toString()) ?? Seat.FLOOR;
	if (seat === Seat.OCCUPIED && nearbyOccupied >= 4) return Seat.EMPTY;
	if (seat === Seat.EMPTY && nearbyOccupied === 0) return Seat.OCCUPIED;
	return seat;
};

const updateSeats = (seats: SeatMap): SeatMap => {
	const newMap = new Map<string, Seat>();

	seats.map.forEach((_: Seat, v: string) => {
		newMap.set(v, update(new Vec2(v), seats));
	});

	return {
		map: newMap,
		width: seats.width,
		height: seats.height,
	};
};

export const seatsMapSame = (seats1: SeatMap, seats2: SeatMap): boolean => {
	const v1 = [...seats1.map.values()];
	const v2 = [...seats2.map.values()];
	return (
		v1.length === v2.length &&
		v1.every(function (value, index) {
			return value === v2[index];
		})
	);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	let map = parse(input);
	let newSeats = map;

	do {
		map = newSeats;
		newSeats = updateSeats(newSeats);
	} while (!seatsMapSame(map, newSeats));

	return [...newSeats.map.values()].filter((seat: Seat) => seat === Seat.OCCUPIED).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
