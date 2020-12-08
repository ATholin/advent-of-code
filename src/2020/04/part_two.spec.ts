import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`2020 - Day 4 - Part Two`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(127);
	});

	it('should solve for the second example', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(4);
	});
});
