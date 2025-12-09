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
  //if (t) console.log(rows)
  //if (t) console.log(column_count)
  if (t) console.log(columns)

  return 0
}
