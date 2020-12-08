import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`2020 - Day 3 - Part Two`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(3424528800);
	});

	it('should solve for the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(336);
	});
});
