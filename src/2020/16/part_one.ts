import { bench, read } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

export interface FieldRange {
	field: string;
	start1: number;
	end1: number;
	start2: number;
	end2: number;
}

export const between = (val: number, start: number, end: number): boolean => {
	return val >= start && val <= end;
};

export const validFor = (val: number, fr: FieldRange): boolean => {
	return between(val, fr.start1, fr.end1) || between(val, fr.start2, fr.end2);
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const [vals, , nearby] = input.split('\n\n');

	const fields = vals.split('\n').map(
		(row: string): FieldRange => {
			const v = row.split(':');
			const ranges = v[1].split(' ');
			const range1 = ranges[1].split('-');
			const range2 = ranges[3].split('-');
			return {
				field: v[0],
				start1: Number(range1[0]),
				end1: Number(range1[1]),
				start2: Number(range2[0]),
				end2: Number(range2[1]),
			};
		}
	);
	const nearbyTickets = nearby
		.split('\n')
		.slice(1)
		.map((nearbyRow: string) => nearbyRow.split(',').map((val: string) => parseInt(val, 10)));

	return nearbyTickets.reduce((acc: number, nearbyRow: number[]) => {
		return (
			acc +
			nearbyRow.reduce((rAcc: number, val: number) => {
				return rAcc + (fields.some((field: FieldRange) => validFor(val, field)) ? 0 : val);
			}, 0)
		);
	}, 0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
