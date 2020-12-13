import axios from 'axios';
import { parse } from './parser';
import QueryResult from './query_result';

export const query = async (year: number, day: number, session: string): Promise<QueryResult> => {
	const description_url = `https://adventofcode.com/${year}/day/${day}`;
	const input_url = description_url + '/input';

	console.log(`Fetching description from ${description_url}`);

	const description_response = await axios.get(description_url, {
		headers: {
			Cookie: `session=${session}`,
		},
	});

	if (description_response.status !== 200) {
		throw new Error('Error getting description');
	}

	console.log(`Fetching input from ${input_url}`);

	const input_response = await axios.get(input_url, {
		transformResponse: (res) => {
			// Do your own parsing here if needed ie JSON.parse(res);
			return res;
		},
		headers: {
			Cookie: `session=${session}`,
		},
	});

	return {
		year: year,
		day: day,
		description: parse(description_response.data),
		input: input_response.data,
	};
};
