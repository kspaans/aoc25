export const TESTS = [
  { filename: 'test.txt', answer: 4277556},
  { filename: 'input.txt'},
]

export const solve = (s, t) => {
  const l = (m) => {
    if (t) console.log(m)
  }

  const rows = s.trim().split('\n')
  const column_count = rows[0].trim().split(' ').filter(x => !!x).length
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

  return result
}
