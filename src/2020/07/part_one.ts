import { bench, read, split } from '@lib';
import { day, year } from '.';

/**
 * UTILITIES
 */

export interface Bag {
	color: string;
	contain: BagContain[];
}

export interface BagContain {
	color: string;
	amount: number;
}

export const findBag = (toFind: string, bags: Bag[]): Bag => {
	return (
		bags.find((bag: Bag) => bag.color === toFind) ?? {
			color: 'yeet',
			contain: [],
		}
	);
};

export const toBag = (bagString: string): Bag => {
	const s = bagString.split(' bags contain ');

	if (s[1].includes('no other')) return { color: s[0], contain: [] };

	const color = s[1].replace(/(\s?[^\s?a-zA-Z,]\s|\sbags?\.?)/g, '').split(',');
	const amount = s[1]
		.replace(/[^\d,]/g, '')
		.split(',')
		.map((a: string) => parseInt(a, 10));

	const bc = color.map(
		(c: string, i: number): BagContain => {
			return {
				color: c,
				amount: amount[i],
			};
		}
	);

	return {
		color: s[0],
		contain: bc,
	};
};

const bagContains = (bag: Bag, toFind: string, bags: Bag[]): boolean => {
	if (bag.contain.some((bc: BagContain) => bc.color === toFind)) return true;
	if (bag.contain.length == 0) return false;

	const bagsInBag = bag.contain.map((contain: BagContain) => findBag(contain.color, bags));
	return bagsInBag.some((bagInBag: Bag) => bagContains(bagInBag, toFind, bags));
};

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const bags = split(input).map(toBag);
	const toFind = 'shiny gold';
	return bags
		.map((bag: Bag) => bagContains(bag, toFind, bags))
		.filter((hasBag: boolean) => hasBag === true).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}
