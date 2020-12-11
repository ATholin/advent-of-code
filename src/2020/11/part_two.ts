import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse, Seat, SeatMap } from './parse';
import { seatsMapSame, directions } from './part_one';

/**
 * UTILITIES
 */

const countNearbyOccupied = (v: Vec2, map: SeatMap): number => {
	return directions.filter((dir: Vec2) => {
		return see(v, dir, map) === Seat.OCCUPIED;
	}).length;
};

const see = (from: Vec2, dir: Vec2, map: SeatMap): Seat | undefined => {
	const current = from.clone();
	while (current.x >= 0 && current.x < map.width && current.y >= 0 && current.y < map.height) {
		current.addMut(dir);

		if (map.map.has(current.toString())) {
			return map.map.get(current.toString());
		}
	}

	return undefined;
};

const update = (v: Vec2, map: SeatMap): Seat => {
	const nearbyOccupied = countNearbyOccupied(v, map);
	const seat = map.map.get(v.toString()) ?? Seat.FLOOR;
	if (seat === Seat.OCCUPIED && nearbyOccupied >= 5) return Seat.EMPTY;
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
