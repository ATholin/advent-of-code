import { bench, read, split } from '@lib';
import { Vec2, Direction } from '@lib/model';
import { day, year } from '.';

/**
 * UTILITIES
 */

export enum Action {
	NORTH = 'N',
	SOUTH = 'S',
	EAST = 'E',
	WEST = 'W',
	LEFT = 'L',
	RIGHT = 'R',
	FORWARD = 'F',
}

export interface Instruction {
	action: Action;
	value: number;
}

export const parse = (instruction: string): Instruction => {
	return {
		action: instruction[0] as Action,
		value: parseInt(instruction.slice(1), 10),
	};
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const instructions: Instruction[] = split(input).map(parse);
	const position = new Vec2(0, 0);
	const direction = new Vec2(1, 0);

	instructions.forEach((instruction: Instruction) => {
		if (instruction.action == Action.NORTH) {
			position.addMut(Direction.NORTH, { times: instruction.value });
		} else if (instruction.action == Action.SOUTH) {
			position.addMut(Direction.SOUTH, { times: instruction.value });
		} else if (instruction.action == Action.WEST) {
			position.addMut(Direction.WEST, { times: instruction.value });
		} else if (instruction.action == Action.EAST) {
			position.addMut(Direction.EAST, { times: instruction.value });
		} else if (instruction.action == Action.RIGHT) {
			direction.rotateRight(instruction.value / 90);
		} else if (instruction.action == Action.LEFT) {
			direction.rotateLeft(instruction.value / 90);
		} else if (instruction.action == Action.FORWARD) {
			position.addMut(direction, { times: instruction.value });
		}
	});

	return Vec2.ORIGIN.manhattan(position);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
