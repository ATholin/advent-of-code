import { query } from '../query/src';
import gatt from 'gatt';
import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';
import { getLatestPuzzleDate } from './util';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const latestDate = getLatestPuzzleDate();

const args = yargs.options({
	year: { type: 'number', demandOption: false, alias: 'y', default: latestDate.year },
	day: { type: 'number', demandOption: false, alias: 'd', default: latestDate.day },
	session: {
		type: 'string',
		demandOption: false,
		alias: 's',
		default: process.env.SESSION ?? '',
	},
}).argv;

if (args.year >= latestDate.year && args.day > latestDate.day) {
	console.log(chalk.red('Cannot add future day'));
	process.exit(1);
}

if (args.session === '') {
	console.log(
		chalk.red(
			'Session not specified. Add it to your .env file or as an argument (-session [SESSION])'
		)
	);
	process.exit(1);
}

query(args.year, args.day, args.session).then((res) => {
	if (fs.existsSync(`src/${args.year}/${args.day}`)) {
		console.log(
			chalk.gray(
				`Directory [${args.year}/${args.day}] already exists. Only updating description + input...`
			)
		);
		fs.writeFileSync(
			join('src', args.year.toString(), args.day.toString(), 'readme.md'),
			res.description
		);
		fs.writeFileSync(
			join('src', args.year.toString(), args.day.toString(), 'resources', 'input.txt'),
			res.input
		);
	} else {
		console.log(
			chalk.gray(`Getting data and copying template to [${args.year}/${args.day}]...`)
		);

		gatt({
			reader_directory: 'src/template',
			writer_directory: 'src/',
			variables: {
				year: res.year,
				day: res.day.toString().padStart(2, '0'),
				shortDay: res.day,
				input: res.input,
				description: res.description,
			},
		});
	}

	console.log(chalk.greenBright('Done!'));
});
