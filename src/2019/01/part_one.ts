import { bench, read, split } from "@util";
import { inputToNumbers } from "util/util";
import { day, year } from ".";

/**
 * UTILITIES
 */

export const calc = (mass: number, recursive: boolean = false) => {
	const rounded: number = Math.round(Math.floor(mass / 3)) - 2;
	if (rounded <= 0) return 0;
	return recursive ? rounded + calc(rounded, true) : rounded;
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return inputToNumbers(input)
			.map((val: number) => calc(val))
			.reduce((a, b) => a + b)
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
