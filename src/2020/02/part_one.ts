import { bench, read, split } from '@util';
import { day, year } from '.';

/**
 * UTILITIES
 */

export interface PasswordPolicy {
	password: string,
	character: string,
	first: number,
	second: number
}

export const convert = (value: string): PasswordPolicy => {
	const policy: string = value.split(':')[0];
	const password: string = value.split(':')[1].trim();

	return {
		password: password,
		character: policy[policy.length - 1],
		first: Number(policy.split('-')[0]),
		second: Number(policy.split('-')[1].split(' ')[0])
	}
}

const validMinMax = (pw: PasswordPolicy): boolean => {
	const num = pw.password.split('').filter(char => char === pw.character).length
	return num >= pw.first && num <= pw.second;
}

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return split(input).map(convert).filter(validMinMax).length
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}