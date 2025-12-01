import { readFileSync } from 'fs'

const path = './input.txt'
const config = {
  encoding: 'utf8',
  flag: 'r'
}
const initial_position = 50
const dial_size = 100

console.log('starting')
const d = readFileSync(path, config)
console.log('done reading')

let position = initial_position
let rests_at_zero = 0

for (const l of d.split('\n')) {
  if (l.length <= 0) {
    console.log('reached end of input')
    console.log(` ==> Final Count: ${rests_at_zero}`)
    break
  }
  //console.log(` --> working line "${l}"`)
  const dir = l[0]
  //console.log(`  \\__> parsing ${l.slice(1)}...`)
  const amount = parseInt(l.slice(1))
  if (dir !== 'L' && dir !== 'R') {
    console.error(`WOAH, data parse error, direction ${dir} is not correct`)
  }
  //console.log(`  \\__> moving ${amount} ticks to the ${dir === 'L' ? 'left' : 'right'}!`)
  if (dir === 'L') {
    position -= (amount % dial_size)
    if (position < 0) {
      position += dial_size
    }
  } else {
    position = (position + amount) % dial_size
  }
  if (position === 0) {
    rests_at_zero += 1
  }
  //console.log(`  ==> position is now ${position}\n`)
}
