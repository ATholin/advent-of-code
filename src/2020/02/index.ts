import _, { max } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
import { TestCase } from "util/@types/global";
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 2;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/at/Code/advent-of-code/src/2020/02/index.ts
// data path    : /Users/at/Code/advent-of-code/src/2020/02/input.txt
// problem url  : https://adventofcode.com/2020/day/2

interface PasswordPolicy {
	password: string,
	character: string,
	first: number,
	second: number
}

const convert = (value: string): PasswordPolicy => {
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

const validPosition = (pw: PasswordPolicy): boolean => {
	return (pw.password.charAt(pw.first - 1) == pw.character) != (pw.password.charAt(pw.second - 1) == pw.character)
}

const p2020day2_part1 = async (input: string): Promise<any> => {
	return util.inputToStrings(input).map(convert).filter(validMinMax).length
}

const p2020day2_part2 = async (input: string): Promise<any> => {
	return util.inputToStrings(input).map(convert).filter(validPosition).length
}

const run = async (): Promise<any> => {
	const part1tests: TestCase[] = [
		{
			input: "1-2 a: aa",
			expected: "1"
		},
		{
			input: "1-5 a: aaaaaa",
			expected: "0"
		},
		{
			input: "1-2 r: aa",
			expected: "0"
		}
	];
	const part2tests: TestCase[] = [
		{
			input: "1-2 a: aa",
			expected: "0"
		},
		{
			input: "1-2 a: ab",
			expected: "1"
		},
		{
			input: "10-11 r: rrrrrrwcrlq",
			expected: "0"
		}
	];

	// Run tests
	test.beginTests()
	test.beginSection();
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day2_part1(testCase.input)));
	}
	test.beginSection();
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day2_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day2_part2(input));
	const part2After = performance.now();
	
	logSolution(DAY, YEAR, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.msToString(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.msToString(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});
