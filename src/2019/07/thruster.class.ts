import { Receiver } from './can_receive.interface';

export default class Thruster implements Receiver {
	data = 0;

	receive = (output: number | number[]): void => {
		// console.log(`Thruster: Received ${this.output} from previous`)
		if (output != null) {
			this.data = Array.isArray(output) ? output[0] : output;
		}
	};
}
