import { bench, read, split } from '@lib';
import { Vec2, Direction } from '@lib/model';
import { day, year } from '.';
import { Action, Instruction, parse } from './part_one';

/**
 * UTILITIES
 */

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const instructions: Instruction[] = split(input).map(parse);
	const position = new Vec2(0, 0);
	const waypoint = new Vec2(10, 1);

	instructions.forEach((instruction: Instruction) => {
		if (instruction.action == Action.NORTH) {
			waypoint.addMut(Direction.NORTH, { times: instruction.value });
		} else if (instruction.action == Action.SOUTH) {
			waypoint.addMut(Direction.SOUTH, { times: instruction.value });
		} else if (instruction.action == Action.WEST) {
			waypoint.addMut(Direction.WEST, { times: instruction.value });
		} else if (instruction.action == Action.EAST) {
			waypoint.addMut(Direction.EAST, { times: instruction.value });
		} else if (instruction.action == Action.RIGHT) {
			waypoint.rotateRight(instruction.value / 90);
		} else if (instruction.action == Action.LEFT) {
			waypoint.rotateLeft(instruction.value / 90);
		} else if (instruction.action == Action.FORWARD) {
			position.addMut(waypoint, { times: instruction.value });
		}
	});

	return Vec2.ORIGIN.manhattan(position);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
