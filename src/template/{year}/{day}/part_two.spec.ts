import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`<%= $.year %> - Day <%= $.shortDay %> - Part Two`, () => {
	it(`should solve for the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(0);
	});

	it('should solve for the second example', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(0);
	});
});
