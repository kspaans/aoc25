import { readFileSync } from 'node:fs'
import path from 'node:path'

function solve(s, t) {
  const l = (m) => {
    if (t) console.log(m)
  }
  return 1
}

const config = {
  encoding: 'utf8',
  flag: 'r'
}
const day = '4'
const TESTS = [
  { filename: 'test.txt', answer: 13},
  { filename: 'input.txt' },
]

function main() {
  for (const t of TESTS) {
    const input = readFileSync(path.join(day, t.filename), config)
    const result = solve(input, t.answer)
    if (t.answer) {
      console.log(`Test ${t.filename.padStart(16, ' ')}: got ${String(result).padStart(10, ' ')}, expected ${String(t.answer).padStart(10, ' ')} ==> ${result === t.answer ? 'PASS' : 'FAIL'}`)
    } else {
      console.log(`Solution: ${result}`)
    }
  }
}

main()
