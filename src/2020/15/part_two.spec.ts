import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`2020 - Day 15 - Part Two`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(1801753);
	});
});
