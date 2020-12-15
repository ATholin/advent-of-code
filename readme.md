# Advent of Code ⭐️

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ATholin/advent-of-code/Node%20CI)
[![codecov](https://codecov.io/gh/ATholin/advent-of-code/branch/main/graph/badge.svg?token=PNV507325B)](https://codecov.io/gh/ATholin/advent-of-code)
![Maintainability](https://img.shields.io/codeclimate/maintainability/ATholin/advent-of-code)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Last Commit on GitHub](https://img.shields.io/github/last-commit/ATholin/advent-of-code.svg)](https://github.com/ATholin/advent-of-code)

This repository contains my solutions for [Advent of Code](https://adventofcode.com) problems. All solutions are implemented in TypeScript and JavaScript, runnable with modern Node.js.

## [2020](https://adventofcode.com/2020/)

[![2020 Progress](https://img.shields.io/static/v1?label=AoC%202020&message=15/25&color=orange)](./src/2020/)

<!-- markdownlint-disable MD013 -->

| Day                      | Part 1                                 | Part 2                                 |
| ------------------------ | -------------------------------------- | -------------------------------------- |
| [Day 1](./src/2020/01/)  | [0.31ms](./src/2020/01/part_one.ts)    | [1.19ms](./src/2020/01/part_two.ts)    |
| [Day 2](./src/2020/02/)  | [4.06ms](./src/2020/02/part_one.ts)    | [2.87ms](./src/2020/02/part_two.ts)    |
| [Day 3](./src/2020/03/)  | [0.23ms](./src/2020/03/part_one.ts)    | [0.46ms](./src/2020/03/part_two.ts)    |
| [Day 4](./src/2020/04/)  | [2.82ms](./src/2020/04/part_one.ts)    | [3.80ms](./src/2020/04/part_two.ts)    |
| [Day 5](./src/2020/05/)  | [11.6ms](./src/2020/05/part_one.ts)    | [17.8ms](./src/2020/05/part_two.ts)    |
| [Day 6](./src/2020/06/)  | [11.2ms](./src/2020/06/part_one.ts)    | [15.7ms](./src/2020/06/part_two.ts)    |
| [Day 7](./src/2020/07/)  | [322ms 😱](./src/2020/07/part_one.ts)  | [16.1ms](./src/2020/07/part_two.ts)    |
| [Day 8](./src/2020/08/)  | [10.7ms](./src/2020/08/part_one.ts)    | [79.1ms](./src/2020/08/part_two.ts)    |
| [Day 9](./src/2020/09/)  | [10.2ms](./src/2020/09/part_one.ts)    | [13.3ms](./src/2020/09/part_two.ts)    |
| [Day 10](./src/2020/10/) | [8.40ms](./src/2020/10/part_one.ts)    | [6.22ms](./src/2020/10/part_two.ts)    |
| [Day 11](./src/2020/11/) | [1944ms 😱](./src/2020/11/part_one.ts) | [1729ms 😱](./src/2020/11/part_two.ts) |
| [Day 12](./src/2020/12/) | [12.6ms](./src/2020/12/part_one.ts)    | [8.97ms](./src/2020/12/part_two.ts)    |
| [Day 13](./src/2020/13/) | [9.08ms](./src/2020/13/part_one.ts)    | [9.67ms](./src/2020/13/part_two.ts)    |
| [Day 14](./src/2020/14/) | [11.7ms](./src/2020/14/part_one.ts)    | [111ms](./src/2020/14/part_two.ts)     |
| [Day 15](./src/2020/15/) | [5.96ms](./src/2020/15/part_one.ts)    | [5716ms 😱](./src/2020/15/part_two.ts)     |

## Usage

Prerequisites: install [Node.js](https://nodejs.org) 14 (LTS) or later.

### Quick-start instructions

1. Create an account at https://adventofcode.com.
2. Fork this repo
3. Clone the forked repository
4. `cd` into the repository and run `npm install`
5. Copy the example environment file to `.env`:

```bash
cp .env.example .env
```

6. In the created `.env` file, add your AOC session token to the `SESSION` variable

7. Scaffold a puzzle:

```bash
npm scaffold 							# Scaffold the current day
npm run scaffold -- --year 2015 --day 1	# Scaffold [year] [day]
```

8. Run a puzzle:

```bash
npm start 			# Run the current day
npm start 2015 1 	# Run [year] [day]
```

## Testing

Run the tests with:

```bash
npm test
```

Run the tests (in parallel) with:

```bash
npm run test:parallel
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
