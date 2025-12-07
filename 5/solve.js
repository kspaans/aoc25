import { readFileSync } from 'node:fs'
import path from 'node:path'

function solve(s, t) {
  const l = (m) => {
    if (t) console.log(m)
  }
  const lines = s.trim().split('\n')

  const fresh_ranges = []
  const ingredients = []
  let parsing_ranges = true
  for (const li of lines) {
    if (li == '') {
      parsing_ranges = false
      continue
    }
    if (parsing_ranges) {
      fresh_ranges.push(li)
    } else {
      ingredients.push(li)
    }
  }

  let spoiled = 0
  let i_flag = true

  ingredients_loop: for (const i of ingredients) {
    for (const r of fresh_ranges) {
      l(`checking for i${i} freshness against ${r}`)
      const [start, end] = r.split('-')
      if (!((parseInt(start) <= parseInt(i)) && (parseInt(i) <= parseInt(end)))) {
        if (i_flag) {
          l(`it's spoiled!`)
          spoiled += 1
        }
        i_flag = false
      } else {
        continue ingredients_loop
      }
    }
    i_flag = true
  }

  return spoiled
}

const config = {
  encoding: 'utf8',
  flag: 'r'
}
const day = '5'
const TESTS = [
  { filename: 'test.txt', answer: 3},
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
