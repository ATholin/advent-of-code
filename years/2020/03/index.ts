import _ from "lodash";
import chalk from "chalk";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
import { TestCase } from "util/@types/global";
import { Vec2Like } from "util/model";
const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 3;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/at/Code/advent-of-code/years/2020/03/index.ts
// data path    : /Users/at/Code/advent-of-code/years/2020/03/input.txt
// problem url  : https://adventofcode.com/2020/day/3

const walk = (map: string[][], position: Vec2Like, slope: Vec2Like): number => {
	if (position.y >= map.length) return 0;

	if (map[position.y][position.x % map[0].length] === "#") {
		return 1 + walk(map, { x: position.x + slope.x, y: position.y + slope.y }, slope);
	}

	return walk(map, { x: position.x + slope.x, y: position.y + slope.y }, slope);
};

const p2020day3_part1 = async (input: string): Promise<any> => {
	const map: string[][] = util.inputToStrings(input).map(row => row.split(""));
	return walk(map, { x: 0, y: 0 }, { x: 3, y: 1 });
};

const p2020day3_part2 = async (input: string): Promise<any> => {
	const map: string[][] = util.inputToStrings(input).map(row => row.split(""));

	let slopes: Vec2Like[] = [
		{ x: 1, y: 1 },
		{ x: 3, y: 1 },
		{ x: 5, y: 1 },
		{ x: 7, y: 1 },
		{ x: 1, y: 2 },
	];

	return slopes.map(slope => walk(map, { x: 0, y: 0 }, slope)).reduce((acc, trees) => acc * trees);
};

const run = async (): Promise<any> => {
	const part1tests: TestCase[] = [
		{
			input: ".....\n.....",
			expected: "0",
		},
		{
			input: "....\n...#",
			expected: "1",
		},
	];
	const part2tests: TestCase[] = [
		{
			input: ".....\n.....",
			expected: "0",
		},
	];

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
	const input = await util.getInput(DAY, YEAR);

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
