import { bench, read, split, sum } from '@lib';
import { day, year } from '.';
import { parse, Instruction } from './part_one';

/**
 * UTILITIES
 */

const writeToMemory = (
	instruction: Instruction,
	mask: string,
	memory: Map<number, number>
): void => {
	if (!mask.includes('X')) {
		memory.set(parseInt(mask, 2), instruction.value);
		return;
	}

	const before = mask.slice(0, mask.indexOf('X'));
	const after = mask.slice(mask.indexOf('X') + 1);
	writeToMemory(instruction, before + '0' + after, memory);
	writeToMemory(instruction, before + '1' + after, memory);
};

const setMask = (address: number, mask: string): string => {
	const bits = address.toString(2).padStart(36, '0').split('');

	mask.split('').forEach((bit: string, index: number) => {
		if (bit === '1') {
			bits[index] = '1';
		}
		if (bit === 'X') {
			bits[index] = 'X';
		}
	});

	return bits.join('');
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
		const maskedAddress = setMask(instruction.address, mask);

		writeToMemory(instruction, maskedAddress, memory);
	});

	return [...memory.values()].reduce(sum);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'input.txt'), runner)}`))();
}
