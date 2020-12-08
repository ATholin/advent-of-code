import { bench, read } from '@util';
import { day, year } from '.';
import { HGC, Instruction, mapInstruction, Operation } from './part_one';

/**
 * UTILITIES
 */

const trySwap = (program: Instruction[], swap: Operation, swapTo: Operation): number => {
	let pgm: Instruction[] = [...program]

	for (let i = 0; i < pgm.length; i++) {
		let swapped = false
		if (pgm[i].operation === swap) {
			pgm[i].operation = swapTo
			swapped = true
		}

		const hgc = new HGC(pgm)
		if (hgc.run()) return i

		if (swapped) pgm[i].operation = swap
	}

	return -1
}

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const instructions: Instruction[] = input.split('\n').map(mapInstruction)

	const jmp = trySwap(instructions, Operation.jmp, Operation.nop)
	if (jmp != -1) {
		let pgm = [...instructions]
		pgm[jmp].operation = Operation.nop
		const hgc = new HGC(pgm)
		hgc.run()
		return hgc.accumulator
	}
	console.log("not jmp")

	const nop = trySwap(instructions, Operation.nop, Operation.jmp)
	if (nop != -1) {
		let pgm = [...instructions]
		pgm[nop].operation = Operation.jmp
		const hgc = new HGC(pgm)
		hgc.run()
		return hgc.accumulator
	}

	return 0
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, "input.txt"), runner)}`))();
}