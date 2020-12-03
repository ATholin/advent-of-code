import * as util from "./util/util";
import path from "path";
import chalk from "chalk";
import { log } from "./util/log";

let [year, day] = process.argv.slice(2).map(Number);
if (year == undefined || day == undefined) {
	({year, day} = util.getLatestPuzzleDate());
}

log(chalk.bold(`Running ${year} day ${day}\n`));

const latestPuzzleFile = path.join(util.getDayRoot(day, year), "index");
require(latestPuzzleFile);
