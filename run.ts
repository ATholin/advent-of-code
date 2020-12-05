import * as util from "./util/util";
import path from "path";
import chalk from "chalk";
import { log } from "./util/log";
import { read, bench } from "./util/index";

let [year, day] = process.argv.slice(2).map(Number);
if (year == undefined || day == undefined) {
	({year, day} = util.getLatestPuzzleDate());
}

log(chalk.bold(`Running ${year} day ${day}\n`));

const dayDir = path.join(util.getDayRoot(day, year));
const index = path.join(dayDir, "part_one");
const part1 = path.join(dayDir, "part_one");
const part2 = path.join(dayDir, "part_one");
const { p1r } = require(part1);
const { p2r } = require(part2);

console.log("Part 1:");
(async () => console.log(`Result: ${await bench(read(year, day), p1r)}`))();

console.log("Part 2:");
(async () => console.log(`Result: ${await bench(read(year, day), p2r)}`))();