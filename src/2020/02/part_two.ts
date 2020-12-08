import { bench, read, split } from '@lib';
import { day, year } from '.';
import { convert, PasswordPolicy } from './part_one';

/**
 * UTILITIES
 */

const validPosition = (pw: PasswordPolicy): boolean => {
	return (
		(pw.password.charAt(pw.first - 1) == pw.character) !=
		(pw.password.charAt(pw.second - 1) == pw.character)
	);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return split(input).map(convert).filter(validPosition).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}
