export const TESTS = [
  { filename: 'test.txt', answer: 21},
  { filename: 'input.txt'},
]

export const solve = (s, t) => {
  const l = (m) => {
    if (t) console.log(m)
  }

  const rows = s.trim().split('\n')
  const column_count = rows[0].trim().split(' ').filter(x => !!x).length
  let splits = 0
  // the indexes of the columns in the manifold where the rays are
  // e.g. "....|.|.." => [4, 6]
  let rays = [rows[0].indexOf('S')]
  
  l(`ray starts in column ${rays}`)

  for (const r of rows.slice(1)) {
    const next_rays = []
      for (const ri of rays) {
        if (r[ri] === '^') {
          splits += 1
          l(`splitting ${ri}: ${r}`)
          const split_left  = ri - 1
          const split_right = ri + 1
          if (next_rays.indexOf(split_left) === -1) {
            next_rays.push(split_left)
            l(`  left`)
          }
          if (next_rays.indexOf(split_right) === -1) {
            next_rays.push(split_right)
            l(`  right`)
          }
        }

        if (r[ri] === '.' && next_rays.indexOf(ri) === -1) {
          next_rays.push(ri)
        }
      }
    rays = next_rays
    l(`now have rays ${rays}`)
  }

  /*
  const columns = new Array(4)
  for (const r of rows) {
    for (const [i,c] of r.trim().split(' ').filter(x => !!x).entries()) {
      if (columns[i]) {
        columns[i].push(c)
      } else {
        columns[i] = [c]
      }
    }
  }
  let result = 0
  for (const c of columns) {
    const operation = c.at(-1)
    const operands = c.slice(0, -1).map(x => parseInt(x))
    if (operation === '+') {
      result += operands.reduce((acc, value) => {
        return acc + value
      }, 0)
    } else if (operation === '*') {
      result += operands.reduce((acc, value) => {
        return acc * value
      }, 1)
    }
  }
  */

  return splits
}
