import { readFileSync } from 'fs'

const path = '2/input.txt'
const config = {
  encoding: 'utf8',
  flag: 'r'
}

console.log('starting')
const d = readFileSync(process.env['P'] || path, config)
console.log('done reading')

const invalid = (s) => {
  // check every possible combo of repeated digits from
  // 1 to half the length of the string
  const max_seq_len = Math.floor(s.length/2)
  console.log(`++ validating ${s}: max sequence length ${max_seq_len}`)
  for (let i = 1; i <= Math.floor(s.length/2); i++) {
    const num_repeats = Math.floor(s.length/i)
    console.log(`++ checking i${i}: max reptitions ${num_repeats}`)
    let strikes = 0
    for (let j = 0; j+i < s.length; j++) {
      console.log(`+++ ${j}/${j+i} checking "${s[j]}" against "${s[j+i]}"`)
      if (s[j] !== s[j+i]) {
        strikes += 1
        console.log(`++++ no match, strike(${strikes})!`)
        continue
      }
      if (j+i === s.length - 1) {
        console.log(`++++ at the end, returning last match`)
        return s[j] === s[j+i]
      }
    }
    if (strikes >= max_seq_len) {
      console.log(`++++ strike out`)
      return false
    }
  }
  return true
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
    if (working.length > max_len) {
      console.log(`   reached end`)
      break
    }
    if (invalid(working)) {
      console.log(` \`==> INVALID        ${working}`)
      sum += parseInt(working)
    }
    working = String(parseInt(working) + 1)
  }
  console.log(` --> DONE LINE <--`)
}

console.log(` ==> sum: ${sum}`)
