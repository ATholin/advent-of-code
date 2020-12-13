export interface DayYear {
	year: number;
	day: number;
}

export const getLatestPuzzleDate = (asOf = new Date()): DayYear => {
	const asUTC = new Date(asOf.getTime() + asOf.getTimezoneOffset() * 60 * 1000);
	const asEST = new Date(asUTC.getTime() - 5 * 60 * 60 * 1000);
	const isDecember = asEST.getMonth() === 11;
	const currentYear = asEST.getFullYear();
	const latestPuzzleYear = isDecember ? currentYear : currentYear - 1;
	const currentDay = asEST.getDate();
	const latestPuzzleDay = isDecember ? Math.min(currentDay, 25) : 25;
	return { day: latestPuzzleDay, year: latestPuzzleYear };
};
