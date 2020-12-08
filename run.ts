import * as util from '@lib/util';
import path from 'path';
import chalk from 'chalk';
import { read, bench } from '@lib';

let [year, day] = process.argv.slice(2).map(Number);
if (year == undefined || day == undefined) {
	({ year, day } = util.getLatestPuzzleDate());
}

console.log(chalk.bold(`Running ${year} day ${day}\n`));

const dayDir = path.join(util.getDayRoot(day, year));
const part1 = path.join(dayDir, 'part_one');
const part2 = path.join(dayDir, 'part_one');
const p1r = import(part1);
const p2r = import(part2);

console.log('Part 1:');
(async () => console.log(`Result: ${await bench(read(year, day), await p1r)}`))();

console.log('Part 2:');
(async () => console.log(`Result: ${await bench(read(year, day), await p2r)}`))();
