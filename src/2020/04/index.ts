import _, { map } from "lodash";
import chalk from "chalk";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
import { TestCase } from "util/@types/global";
const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 4;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/at/Code/advent-of-code/years/2020/04/index.ts
// data path    : /Users/at/Code/advent-of-code/years/2020/04/input.txt
// problem url  : https://adventofcode.com/2020/day/4

interface Passport {
	fields: PassportField[]
}

interface PassportField {
	key: string,
	value: string
}

const validators = {
	'byr' : (field: string): boolean => field.match(/^\d{4}$/) != null && 1920 <= Number(field) && Number(field) <= 2002,
	'iyr' : (field: string): boolean => field.match(/^\d{4}$/) != null && 2010 <= Number(field) && Number(field) <= 2020,
	'eyr' : (field: string): boolean => field.match(/^\d{4}$/) != null && 2020 <= Number(field) && Number(field) <= 2030,
	'hgt' : (field: string): boolean => (field.match(/^\d{3}cm$/) != null && 150 <= Number(field.replace('cm', '')) && Number(field.replace('cm', '')) <= 193) || (field.match(/^\d{2}in$/) != null && 59 <= Number(field.replace('in', '')) && Number(field.replace('in', '')) <= 76),
	'hcl' : (field: string): boolean => field.match(/^#[0-9a-f]{6}$/) != null,
	'ecl' : (field: string): boolean => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(field),
	'pid' : (field: string): boolean => field.match(/^\d{9}$/) != null,
	'cid' : (field: string): boolean => true
}

const validRequired = (passport: Passport): boolean => Object
	.keys(validators)
	.filter((field: string) => field !== 'cid')
	.every((field: string) => passport.fields.map((f: PassportField) => f.key).includes(field))

const validData = (passport: Passport): boolean => validRequired(passport) && !passport.fields.some((field: PassportField) => !validators[field.key](field.value))

const parsePassport = (passportString: string): Passport => {
	return { 
		fields: passportString.split('\n').join(' ').split(' ').map(v => v.split(':')).map((v: string[]) => ({
			key: v[0],
			value: v[1]
		}))
	};
}

const p2020day3_part1 = async (input: string): Promise<any> => {
	return input.split('\n\n').map(parsePassport).filter(validRequired).length;
};

const p2020day3_part2 = async (input: string): Promise<any> => {
	return input.split('\n\n').map(parsePassport).filter(validData).length;
};

const run = async (): Promise<any> => {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	test.beginSection();
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day3_part1(testCase.input)));
	}
	test.beginSection();
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day3_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR, "input.txt");

	const part1Before = performance.now();
	const part1Solution = String(await p2020day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2020day3_part2(input));
	const part2After = performance.now();

	logSolution(DAY, YEAR, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.msToString(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.msToString(part2After - part2Before)}`));
	log();
};

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});
