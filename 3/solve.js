import { readFileSync } from 'node:fs'
import path from 'node:path'

function solve(s, t) {
  const l = (m) => {
    if (t) console.log(m)
  }

  let answer = 0
  for (const bank of s.split('\n')) {
    if (!bank) {
      return answer
    }
    l(`voltage of bank ${bank}...`)
    let largest_tens = -1
    let largest_tens_index = -1
    let largest_digit = -1
    let largest_digit_index = -1
    for (const [i, digit] of Array.from(bank).entries()) {
      const d = parseInt(digit)
      // for the tens we have to stop before the end of the string
      if (i <= bank.length - 2) {
        if (d > largest_tens) {
          largest_tens = d
          largest_tens_index = i
        }
      } else {
        if (d > largest_digit) {
          largest_digit = d
          largest_digit_index = i
        }
        break
      }
    }
    l(`got largest tens '${largest_tens} at index ${largest_tens_index}`)
    for (let j = largest_tens_index + 1; j < bank.length; j++) {
      const d = parseInt(bank[j])
        if (d > largest_digit) {
          largest_digit = d
          largest_digit_index = j
        }
    }
    const joltage = parseInt(`${largest_tens}${largest_digit}`)
    l(`got joltage ${joltage}`)
    answer += joltage
  }
  return answer
}

const config = {
  encoding: 'utf8',
  flag: 'r'
}
const day = '3'
const TESTS = [
  { filename: 'test.txt', answer: 357},
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
