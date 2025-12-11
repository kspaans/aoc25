import { readFileSync } from 'node:fs'
import path from 'node:path'

import * as solve_6 from   './6/solve.js'
import * as solve_7 from   './7/solve.js'
import * as solve_8 from   './8/solve.js'
import * as solve_9 from   './9/solve.js'
import * as solve_10 from './10/solve.js'
import * as solve_11 from './11/solve.js'
import * as solve_12 from './12/solve.js'

const config = {
  encoding: 'utf8',
  flag: 'r'
}

function main() {
  const day = process.argv[2]
  if (!day) {
    console.error(`ERROR: no puzzle day given, please run \`node aoc.js <day>\``)
    return
  }
  console.log(`Solving AoC Day ${day}`)
  const m = {
    '6': solve_6,
    '7': solve_7,
    '8': solve_8,
    '9': solve_9,
    '10': solve_10,
    '11': solve_11,
    '12': solve_12,
  }
  const p = m[day]

  for (const t of p.TESTS) {
    const input = readFileSync(path.join(day, t.filename), config)
    const result = p.solve(input, t.answer)
    if (t.answer) {
      console.log(`Test ${t.filename.padStart(16, ' ')}: got ${String(result).padStart(10, ' ')}, expected ${String(t.answer).padStart(10, ' ')} ==> ${result === t.answer ? 'PASS' : 'FAIL'}`)
    } else {
      console.log(`Solution: ${result}`)
    }
  }
}

main()
