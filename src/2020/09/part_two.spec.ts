import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`2020 - Day 9 - Part Two`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input, 14144619)).to.equal(1766397);
	});

	it('should solve for the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input, 127)).to.equal(62);
	});
});
