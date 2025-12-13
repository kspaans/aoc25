export const TESTS = [
  { filename: 'test.txt', answer: 40},
  { filename: 'input.txt'},
]

export const solve = (s, t) => {
  const l = (m) => {
    if (t) console.log(m)
  }

  const dist3 = (x,y) => {
    return Math.sqrt(
      Math.pow(x.x - y.x, 2) +
      Math.pow(x.y - y.y, 2) +
      Math.pow(x.z - y.z, 2)
    )
  }

  const rows = s.trim().split('\n')
  const jboxes = rows.map(r => {
    const [sx,sy,sz] = r.split(',')
    return {
      x: parseInt(sx),
      y: parseInt(sy),
      z: parseInt(sz),
    }
  })


  const distance_pairs = {}
  //jboxes.sort((a,b) => a.x - b.x)
  //l(jboxes)

  for (const [i,b] of jboxes.entries()) {
    if (i % 100 === 0) console.log(`processing... ${i}`)
    for (let j = i; j < jboxes.length; j++) {
      if (b == jboxes[j]) {
        continue
      }
      const key = `${b.x},${b.y},${b.z}:${jboxes[j].x},${jboxes[j].y},${jboxes[j].z}`
      if (!distance_pairs[key]) {
        distance_pairs[key] = dist3(b, jboxes[j])
      }
    }
  }
  const sorted_pairs = []
  for (const k in distance_pairs) {
    sorted_pairs.push([distance_pairs[k], k])
  }
  sorted_pairs.sort((a,b) => a[0]-b[0])
  l(sorted_pairs.slice(0,Math.floor(rows.length/2)))
  const edges = {}
  let circuit_sets = {}
  let circuits = 0
  for (const p of sorted_pairs.slice(0,1000)) {
    const [a, b] = p[1].split(':')
    // build the graph in both directions, so that we don't duplicate edges
    if (edges[a] && edges[a].e.indexOf(b) === -1 &&
        edges[b] && edges[b].e.indexOf(a) === -1) {
      if (edges[a].circuit !== edges[b].circuit) {
        const circuit_to_remove = edges[b].circuit
        for (const k in edges) {
          if (edges[k].circuit === circuit_to_remove) {
            circuit_sets[edges[a].circuit].add(k)
            circuit_sets[circuit_to_remove].delete(k)
            edges[k].circuit = edges[a].circuit
          }
        }
      } else {
        edges[a].e.push(b)
        edges[b].e.push(a)
      }
    } else if (edges[a]) {
      edges[b] = { circuit: edges[a].circuit, e: [a] }
      edges[a].e.push(b)
      circuit_sets[edges[a].circuit].add(b)
    } else if (edges[b]) {
      edges[a] = { circuit: edges[b].circuit, e: [b] }
      edges[b].e.push(a)
      circuit_sets[edges[a].circuit].add(a)
    } else {
      edges[a] = { circuit: circuits, e: [b] }
      edges[b] = { circuit: circuits, e: [a] }
      circuit_sets[circuits] = new Set([a,b])
      circuits += 1
    }
  }
  l(circuit_sets)

  const three_longest = []
  for(const k in circuit_sets) {
    three_longest.push(circuit_sets[k])
  }
  three_longest.sort((a,b) => b.size-a.size)
  l(three_longest.slice(0,3))
  return three_longest.slice(0,3).reduce((acc, value) => { return acc * value.size }, 1)
}
