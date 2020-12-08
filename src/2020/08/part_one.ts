import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

export enum Operation {
	acc = 'acc',
	jmp = 'jmp',
	nop = 'nop',
}

export interface Instruction {
	operation: Operation;
	argument: number;
}

export const mapInstruction = (instruction: string): Instruction => ({
	operation: Operation[instruction.split(' ')[0] as keyof typeof Operation],
	argument: parseInt(instruction.split(' ')[1], 10),
});

export class HGC {
	private _program: Instruction[];
	private _irc: Map<number, number>;
	private _acc = 0;
	private _pc = 0;

	constructor(program: Instruction[]) {
		this._program = program;
		this._irc = new Map<number, number>();
	}

	performInstruction(instruction: Instruction): this {
		this.incrementIRC();
		if (this.getIRC() > 1) return this;

		switch (instruction.operation) {
			case Operation.nop:
				this._pc += 1;
				break;
			case Operation.acc:
				this._acc += instruction.argument;
				this._pc += 1;
				break;
			case Operation.jmp:
				this._pc += instruction.argument;
				break;
		}

		return this;
	}

	incrementIRC(pc: number = this._pc): number {
		this._irc.set(pc, (this._irc.get(pc) ?? 0) + 1);
		return this.getIRC(pc);
	}

	getIRC(pc: number = this._pc): number {
		return this._irc.get(pc) ?? 0;
	}

	public run(): boolean {
		while (this._pc < this._program.length) {
			if (this.getIRC() > 1) {
				return false;
			}
			this.performInstruction(this._program[this._pc]);
		}

		return true;
	}

	public get accumulator(): number {
		return this._acc;
	}
}

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const instructions: Instruction[] = input.split('\n').map(mapInstruction);

	const hgc = new HGC(instructions);
	hgc.run();
	return hgc.accumulator;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'input.txt'), runner)}`))();
}
