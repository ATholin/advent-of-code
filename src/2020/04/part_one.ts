import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

export interface Passport {
	fields: PassportField[];
}

export interface PassportField {
	key: string;
	value: string;
}

export const validRequired = (passport: Passport): boolean =>
	Object.keys(validators)
		.filter((field: string) => field !== 'cid')
		.every((field: string) => passport.fields.map((f: PassportField) => f.key).includes(field));

export const parsePassport = (passportString: string): Passport => {
	return {
		fields: passportString
			.split('\n')
			.join(' ')
			.split(' ')
			.map((v) => v.split(':'))
			.map((v: string[]) => ({
				key: v[0],
				value: v[1],
			})),
	};
};

export const validators = {
	byr: (field: string): boolean =>
		field.match(/^\d{4}$/) != null && 1920 <= Number(field) && Number(field) <= 2002,
	iyr: (field: string): boolean =>
		field.match(/^\d{4}$/) != null && 2010 <= Number(field) && Number(field) <= 2020,
	eyr: (field: string): boolean =>
		field.match(/^\d{4}$/) != null && 2020 <= Number(field) && Number(field) <= 2030,
	hgt: (field: string): boolean =>
		(field.match(/^\d{3}cm$/) != null &&
			150 <= Number(field.replace('cm', '')) &&
			Number(field.replace('cm', '')) <= 193) ||
		(field.match(/^\d{2}in$/) != null &&
			59 <= Number(field.replace('in', '')) &&
			Number(field.replace('in', '')) <= 76),
	hcl: (field: string): boolean => field.match(/^#[0-9a-f]{6}$/) != null,
	ecl: (field: string): boolean =>
		['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(field),
	pid: (field: string): boolean => field.match(/^\d{9}$/) != null,
	cid: (): boolean => true,
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	return input.split('\n\n').map(parsePassport).filter(validRequired).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}
