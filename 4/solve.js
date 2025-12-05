import { readFileSync } from 'node:fs'
import path from 'node:path'

function solve(s, t) {
  const l = (m) => {
    if (t) console.log(m)
  }
  const rows = s.trim().split('\n')
  const accessible_rolls = 0
  const height = rows.length
  const width = rows[0].length
  let reachable = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rows[y][x] === '.') {
        continue
      }
      let surround_count = 0
      // 247
      // 1x6 check in this order
      // 358
      if (x > 0) {
        surround_count += rows[y][x-1] === '@' ? 1 : 0
        if (y > 0) {
          surround_count += rows[y-1][x-1] === '@' ? 1 : 0
        }
        if (y < (height - 1)) {
          surround_count += rows[y+1][x-1] === '@' ? 1 : 0
        }
      }
      if (y > 0) {
        surround_count += rows[y-1][x]   === '@' ? 1 : 0
      }
      if (y < (height - 1)) {
        surround_count += rows[y+1][x]   === '@' ? 1 : 0
      }
      if (x < (width - 1)) {
        surround_count += rows[y][x+1] === '@' ? 1 : 0
        if (y > 0) {
          surround_count += rows[y-1][x+1] === '@' ? 1 : 0
        }
        if (y < (height - 1)) {
          surround_count += rows[y+1][x+1] === '@' ? 1 : 0
        }
      }

      if (surround_count < 4) {
        reachable += 1
      }
    }
  }
  return reachable
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
