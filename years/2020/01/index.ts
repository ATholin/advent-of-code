import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
import { TestCase } from "util/@types/global";
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 1;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/at/Code/advent-of-code/years/2020/01/index.ts
// data path    : /Users/at/Code/advent-of-code/years/2020/01/input.txt
// problem url  : https://adventofcode.com/2020/day/1

const p2020day1_part1 = async(input: string): Promise<any> => {
	const values: number[] = util.inputToNumbers(input);
	const hash: Set<number> = new Set<number>();

	for (const i in values) {
		const val: number = values[i];

		const diff = 2020 - val;

		if (hash.has(diff)) {
			return diff * val;
		}

		hash.add(val);
	}
}

const p2020day1_part2 = async (input: string): Promise<any> => {
	const values: number[] = util.inputToNumbers(input);

	for (const i in values) {
		if (values[i] >= 2020) continue;
		for (const j in values) {
			if (values[i] + values[j] >= 2020) continue;
			for (const k in values) {
				if (values[i] + values[j] + values[k] === 2020) {
					return values[i] * values[j] * values[k];
				}
			}
		}
	}
}

const run = async (): Promise<any> => {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	test.beginSection();
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day1_part1(testCase.input)));
	}
	test.beginSection();
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day1_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2020day1_part2(input));
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
