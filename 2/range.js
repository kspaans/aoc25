import { readFileSync } from 'fs'

const path = '2/input.txt'
const config = {
  encoding: 'utf8',
  flag: 'r'
}

console.log('starting')
const d = readFileSync(process.env['P'] || path, config)
console.log('done reading')

const valid = (s) => {
  if (s.length % 2 === 1) {
    return false
  }
  const midpoint = s.length / 2
  const first = s.slice(0,midpoint)
  const second = s.slice(midpoint)
  console.log(` \`-> comparing ${first}/${second}`)
  return first === second
}

let sum = 0
for (const l of d.split(',')) {
  const [start, end] = l.trim().split('-')
  let working = start
  const max_len = end.length
  console.log(` --> working line "${l.trim()}"`)
  console.log(` \`-> starting        ${start}`)
  console.log(` \`-> ending          ${end}`)
  console.log(` \`-> max num length  ${max_len}`)
  while (parseInt(working) <= parseInt(end)) {
    if (working.length === max_len && working.length % 2 === 1) {
      console.log(`   readed end`)
      break
    }
    if (working.length % 2 === 1) {
      // all numbers in this range are valid, add a digit
      working = `1${(new Array(working.length)).fill('0').join('')}`
      console.log(`   invalid range, moving up a digit: ${working}`)
    } else {
      if (valid(working)) {
        console.log(` \`==> VALID        ${working}`)
        sum += parseInt(working)
      }
      working = String(parseInt(working) + 1)
    }
  }
}

console.log(` ==> sum: ${sum}`)
