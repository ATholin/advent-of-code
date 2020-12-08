import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`2020 - Day 1 - Part Two`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(293450526);
	});

	it('should solve for the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(241861950);
	});
});
