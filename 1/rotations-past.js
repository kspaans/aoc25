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
let passes_zero = 0

for (const l of d.split('\n')) {
  if (l.length <= 0) {
    console.log('reached end of input')
    console.log(` ==> Final Count: ${passes_zero}`)
    break
  }
  //console.log(` --> working line "${l}"`)
  const dir = l[0]
  //console.log(`  \\__> parsing ${l.slice(1)}...`)
  let amount = parseInt(l.slice(1))
  if (dir !== 'L' && dir !== 'R') {
    console.error(`WOAH, data parse error, direction ${dir} is not correct`)
  }

  if (amount >= dial_size) {
    //console.log(`  ===> mutli-spin past zero ${Math.floor(amount / dial_size)}`)
    passes_zero += Math.floor(amount / dial_size)
  }
  // before doing anything else, adjust the spin amount to the effective number
  // of ticks modulo the size of the dial
  amount = amount % dial_size

  //console.log(`  \\__> moving ${amount} (${amount % dial_size}) ticks to the ${dir === 'L' ? 'left' : 'right'}!`)
  let prev_position = position
  if (dir === 'L') {
    position -= amount
    if (position === 0 && amount !== 0) {
      //console.log(`  ===> left  side past zero`)
      passes_zero += 1
    }
    if (position < 0) {
      if (prev_position !== 0) {
        //console.log(`  ===> left  side past zero`)
        passes_zero += 1
      }
      position += dial_size
    }
  } else {
    position += amount
    if (position >= dial_size) {
      if (prev_position !== 0) {
        //console.log(`  ===> right side past zero`)
        passes_zero += 1
      }
      position -= dial_size
    }
  }
  //console.log(`  ==> number of passes over zero: ${passes_zero}`)
  //console.log(`  ==> position is now ${position}\n`)
}
