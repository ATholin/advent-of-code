import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe(`2020 - Day 15 - Part One`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(468);
	});

	it('should solve for the examples', async () => {
		expect(runner('1,3,2')).to.equal(1);
		expect(runner('2,1,3')).to.equal(10);
		expect(runner('1,2,3')).to.equal(27);
		expect(runner('3,2,1')).to.equal(438);
		expect(runner('3,1,2')).to.equal(1836);
	});
});
