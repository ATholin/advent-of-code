import { bench, read, split, sum } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

export interface Instruction {
	address: number;
	value: number;
}

export const parse = (instruction: string): Instruction | string => {
	const [address, value] = instruction.split(' = ');

	if (address === 'mask') return value;

	return {
		address: address === 'mask' ? -1 : parseInt(address.replace(/[^\d]/g, ''), 10),
		value: parseInt(value, 10),
	};
};

const setMask = (value: number, mask: string): number => {
	const bits = value.toString(2).padStart(36, '0').split('');

	mask.split('').forEach((bit: string, index: number) => {
		if (bit !== 'X') {
			bits[index] = bit;
		}
	});

	return parseInt(bits.join(''), 2);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const instructions = split(input).map(parse);
	const memory = new Map<number, number>();
	let mask = '0'.padStart(36, '0');

	instructions.forEach((instruction: Instruction | string) => {
		if (typeof instruction === 'string') {
			mask = instruction;
			return;
		}

		memory.set(instruction.address, setMask(instruction.value, mask));
	});

	return [...memory.values()].reduce(sum);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'input.txt'), runner)}`))();
}
