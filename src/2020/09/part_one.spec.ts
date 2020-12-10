import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe(`2020 - Day 9 - Part One`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input, 25)).to.equal(14144619);
	});

	it(`should solve for the first example`, async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input, 5)).to.equal(127);
	});
});
