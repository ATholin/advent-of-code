import { getLatestPuzzleDate } from './scaffold/src/util';
import { read, bench } from '@lib';
import yargs from 'yargs';
import { join } from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { spawnSync } from 'child_process';

const latestDate = getLatestPuzzleDate();

yargs.command(
	'$0 [year] [day]',
	'Run the day',
	(yargs) => {
		yargs
			.positional('year', {
				describe: 'the year to run',
				type: 'number',
				default: latestDate.year,
			})
			.positional('day', {
				describe: 'the day to run',
				type: 'number',
				default: latestDate.day,
			});
	},
	(argv) => {
		const year = String(argv.year);
		const day = String(argv.day).padStart(2, '0');

		const path = join('./src', year, day);

		if (!fs.existsSync(path)) {
			console.log(chalk.red(`${argv.year} day ${argv.day} does not exist!`));
			console.log(chalk.gray(`Scaffolding ${argv.year} day ${argv.day}...\n`));
			spawnSync('npm', ['run', 'scaffold', '--', '--year', year, '--day', day]);
			process.exit(0);
		}

		console.log(chalk.bold(chalk.green(`Running ${year} day ${day}...\n`)));

		import(`./src/${year}/${day}/part_one.ts`).then((part1) => {
			(async () => {
				console.log(
					`Result: ${chalk.green(
						await bench(read(Number(year), Number(day)), part1.runner)
					)}\n`
				);
				import(`./src/${year}/${day}/part_two.ts`).then((part2) => {
					(async () =>
						console.log(
							`Result: ${chalk.green(
								await bench(read(Number(year), Number(day)), part2.runner)
							)}\n`
						))();
				});
			})();
		});
	}
).argv;
