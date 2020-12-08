import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe(`2020 - Day 2 - Part One`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(378);
	});

	it('should solve for the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(2);
	});
});
