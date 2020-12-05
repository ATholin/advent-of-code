import { bench, read, split } from '@util';
import { day, year } from '.';
import { parsePassport, Passport, PassportField, validators, validRequired } from './part_one';

/**
 * UTILITIES
 */

const validData = (passport: Passport): boolean => validRequired(passport) && !passport.fields.some((field: PassportField) => !validators[field.key](field.value))

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return input.split('\n\n').map(parsePassport).filter(validData).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}