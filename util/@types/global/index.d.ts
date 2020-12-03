interface TestCase {
	input: string;
	expected: string;
}

/**
 * The type of a part. There's a default
 * result for the input, but more can be added.
 */
export interface PartResults<T = number> {
	input: T;
	example: T;
	[key: string]: T;
}

/**
 * The type of all the available inputs when it's not presented
 * in a file
 */
export interface PartInputs<T, A> {
	input: Input<T, A>;
	example: Input<T, A>;
	[key: string]: Input<T, A>;
}

/**
 * The type of the results of a Day, describes
 * the results of both parts.
 */
export interface DayResults<O = number, T = O> {
	one: Partial<PartResults<O>>;
	two: Partial<PartResults<T>>;
}

/**
 * When the input is so brief that it's not even presented
 * to you as a separate page I just add them into the `index.ts`
 * in this format
 */
export interface DayInputs<O = number, T = O, A = undefined> {
	one: PartInputs<O, A>;
	two: PartInputs<T, A>;
}

declare module "a-star" {
	export default function (options: any): { status: stringify; path: any[] };
}
