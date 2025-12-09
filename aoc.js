import { readFileSync } from 'node:fs'
import path from 'node:path'

import * as solve_6 from './6/solve.js'

const config = {
  encoding: 'utf8',
  flag: 'r'
}
const TESTS = [
  { filename: 'test.txt', answer: 3},
  { filename: 'input.txt', answer: true},
]

function main() {
  const day = process.argv[2]
  if (!day) {
    console.error(`ERROR: no puzzle day given, please run \`node aoc.js <day>\``)
    return
  }
  console.log(`Solving AoC Day ${day}`)
  const m = {
    '6': solve_6,
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
