import * as path from 'path';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { NEWLINE } from './regex/index';
import { DayYear } from '@lib';

/**
 * Convinienence method to split up a long string into it's
 * non empty lines in an OS agnostic way
 */
const split = (input: string): string[] => input.split(NEWLINE).filter((line) => !!line);

/**
 * Helper to split the input to an array of strings.
 * @param corpus Input string
 * @param split Delimiter to split
 */
export const inputToNumbers = (input: string): number[] =>
	split(input).map((v: string) => Number(v));

/**
 * Helper to split the input to an array of strings.
 * @param corpus Input string
 * @param split Delimiter to split
 */
export const inputToStrings = (input: string): string[] => split(input);

export function getLatestPuzzleDate(asOf = new Date()): DayYear {
	const asUTC = new Date(asOf.getTime() + asOf.getTimezoneOffset() * 60 * 1000);
	const asEST = new Date(asUTC.getTime() - 5 * 60 * 60 * 1000);
	const isDecember = asEST.getMonth() === 11;
	const currentYear = asEST.getFullYear();
	const latestPuzzleYear = isDecember ? currentYear : currentYear - 1;
	const currentDay = asEST.getDate();
	const latestPuzzleDay = isDecember ? Math.min(currentDay, 25) : 25;
	return { day: latestPuzzleDay, year: latestPuzzleYear };
}

/**
 * Starting from the directory this file is running in, search up
 * through folders until a "package.json" file is found. Return this
 * directory's path.
 */
export function getAppRoot(): string {
	let currentDir = __dirname;
	while (!existsSync(path.join(currentDir, 'package.json'))) {
		currentDir = path.dirname(currentDir);
	}
	return currentDir;
}

export function getDayRoot(
	day: number,
	year: number,
	rootDir = path.join(getAppRoot(), 'src')
): string {
	const dayWithLeadingZeros = String(day).padStart(2, '0');
	return path.join(rootDir, String(year), dayWithLeadingZeros);
}

export function getProblemUrl(day: number, year: number): string {
	return `https://adventofcode.com/${year}/day/${day}`;
}

export async function getInput(
	day: number,
	year: number,
	file = 'input.txt',
	rootDir = path.join(getAppRoot(), 'src')
): Promise<string> {
	const dayRoot = getDayRoot(day, year, rootDir);
	return fs.readFile(path.join(dayRoot, file), 'utf-8');
}

export const chunk = <T>(arr: T[], size: number): T[][] => {
	const sets: T[][] = [];
	const chunks = Math.ceil(arr.length / size);
	let i = 0;

	while (i < chunks) {
		sets[i] = arr.splice(0, size);
		i += 1;
	}
	return sets;
};

export const sum = (acc: number, next: number): number => acc + next;
export const mult = (acc: number, next: number): number => acc * next;
export const dup = (next: number): number => next * 2;
export const asc = (a: number, b: number): number => a - b;
export const desc = (a: number, b: number): number => b - a;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const permutations = (arr) => {
	if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : [arr];
	return arr.reduce(
		(acc, item, i) =>
			acc.concat(
				permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [item, ...val])
			),
		[]
	);
};
