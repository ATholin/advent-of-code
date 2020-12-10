import IntCode from '@lib/intcode';
import { Receiver } from './can_receive.interface';
import Thruster from './thruster.class';

export default class Amplifier extends IntCode implements Receiver {
	private nextAmplifier?: Amplifier;

	thruster?: Thruster;

	connectNextAmplifier = (next: Amplifier): this => {
		this.nextAmplifier = next;
		return this;
	};

	connectThruster = (thruster: Thruster): this => {
		this.thruster = thruster;
		return this;
	};

	sendToThruster = (): this => {
		if (this.output.length > 0) {
			// console.log(`${this.name}: Sending output ${this.output} to Thruster`)
			this.sendOutput(this.output, <Receiver>this.thruster);
		}

		return this;
	};

	sendToNext = (): this => {
		if (this.output.length > 0) {
			// console.log(`${this.name}: Sending output ${this.output} to ${this.nextAmplifier.name}`)
			this.sendOutput(this.output, <Receiver>this.nextAmplifier);
		}

		return this;
	};

	sendToMultiple = (targets: Receiver[]): this => {
		if (this.output.length > 0) {
			targets.forEach((target: Receiver) => {
				// console.log(`${this.name}: Sending ${this.output} to ${this.nextAmplifier.name}`)
				target.receive(this.output);
			});
		}

		this.output = [];

		return this;
	};

	sendOutput = (output: number[], target: Receiver): this => {
		target.receive(output);

		this.output = [];

		return this;
	};

	receive = (output: number[]): void => {
		// console.log(`${this.name}: Received ${this.output} from previous`)
		this.pushInput(output);
	};
}
