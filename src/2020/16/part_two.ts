import { bench, read } from '@lib';
import { day, year } from '.';
import { FieldRange, validFor } from './part_one';

/**
 * UTILITIES
 */

export const allValid = (vals: number[], field: FieldRange): boolean => {
	return vals.every((val: number) => validFor(val, field));
};

/**
 * RUNNER
 */

export const runner = (input: string): bigint => {
	const [vals, your, nearby] = input.split('\n\n');

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

	const myTicket = your
		.split('\n')
		.slice(1)
		.map((nearbyRow: string) =>
			nearbyRow.split(',').map((val: string) => parseInt(val, 10))
		)[0];
	const nearbyTickets = nearby
		.split('\n')
		.slice(1)
		.map((nearbyRow: string) => nearbyRow.split(',').map((val: string) => parseInt(val, 10)));

	const validNearbyTickets = nearbyTickets.filter((nearbyRow: number[]) => {
		return nearbyRow.every((val: number) => {
			return fields.some((field: FieldRange) => {
				return validFor(val, field);
			});
		});
	});

	const map = new Map<number, number[]>();

	validNearbyTickets.forEach((ticket: number[]) => {
		ticket.forEach((val: number, index: number) => {
			map.set(index, [...(map.get(index) ?? []), val]);
		});
	});

	const fieldColMap = new Map<string, number>();
	let p2 = BigInt(1);

	while (fields.length > 0) {
		for (const field of fields) {
			const validForField = [...map.entries()].filter((values: [number, number[]]) => {
				return allValid(values[1], field);
			});

			if (validForField.length == 1) {
				fieldColMap.set(field.field, validForField[0][0]);
				map.delete(validForField[0][0]);
				fields.splice(fields.indexOf(field), 1);
				if (field.field.includes('departure')) {
					p2 *= BigInt(myTicket[validForField[0][0]]);
				}
			}
		}
	}

	return p2;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'input.txt'), runner)}`))();
}
