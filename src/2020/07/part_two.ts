import { bench, read, split } from '@util';
import { sum } from 'util/util';
import { day, year } from '.';
import { Bag, BagContain, findBag, toBag } from './part_one';

/**
 * UTILITIES
 */

const countBagsIn = (bag: Bag, bags: Bag[]): number => {
	if (bag.contain.length === 0) return bag.contain.reduce((acc: number, bagContain: BagContain) => acc + bagContain.amount, 0)

	return bag.contain.reduce((acc: number, bagContain: BagContain) => acc + bagContain.amount, 0) + bag.contain.map((bagContain: BagContain) => {
		const b = findBag(bagContain.color, bags)
		return bagContain.amount * countBagsIn(b, bags)
	}).reduce((acc, val) => acc + val, 0)
}

/**
 * RUNNER
 */

export const runner = (input: string): number => {
	const bags = split(input).map(toBag)
	const bag = findBag('shiny gold', bags)
	return countBagsIn(bag, bags)
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))();
}