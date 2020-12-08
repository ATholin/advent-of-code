import IntCode from '@lib/intcode';
import { expect } from 'chai';

describe(`IntCode`, () => {
	it(`should resolve program from string`, async () => {
		const program = '1,1,1,1';
		const ic = new IntCode(program);

		expect(ic.program).to.be.an('array').that.includes(1);
	});

	it(`should resolve program from number array`, async () => {
		const program = [1, 2, 3, 4];
		const ic = new IntCode(program);

		expect(ic.program).to.be.an('array').that.includes(1);
	});

	it(`can get value at position from program`, async () => {
		const program = [1, 2, 3, 4];
		const ic = new IntCode(program);

		expect(ic.getAtPosition(0)).to.equal(1);
		expect(ic.getAtPosition(1)).to.equal(2);
		expect(ic.getAtPosition(2)).to.equal(3);
		expect(ic.getAtPosition(3)).to.equal(4);
	});

	it(`can set value at position in program`, async () => {
		const program = [1, 2, 3, 4];
		const ic = new IntCode(program);

		expect(ic.getAtPosition(0)).to.equal(1);
		ic.setAtPosition(0, 0);
		expect(ic.getAtPosition(0)).to.equal(0);
	});

	it(`can only set value at position within program`, async () => {
		const program = [1, 2, 3, 4];
		const ic = new IntCode(program);

		expect(() => ic.setAtPosition(100, 0)).to.throw(
			'Error setting value [0] at position [100]. Outside program scope'
		);
	});

	it(`should resolve input from number`, async () => {
		const input = 1;
		const ic = new IntCode([]).withInput(input);

		expect(ic.input).to.be.an('array').that.includes(1);
	});

	it(`should resolve input from number array`, async () => {
		const input = [1];
		const ic = new IntCode([]).withInput(input);

		expect(ic.input).to.be.an('array').that.includes(1);
	});

	it(`can push input`, async () => {
		const ic = new IntCode([]);

		expect(ic.input).to.be.empty;
		ic.pushInput(1);
		expect(ic.input).to.be.an('array').that.includes(1);
	});
});
