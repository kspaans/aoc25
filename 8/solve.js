export const TESTS = [
  { filename: 'test.txt', answer: 40},
  { filename: 'input.txt', answer: 98698},
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
  console.log(` number of pairs: ${Object.keys(distance_pairs).length}`)
  const sorted_pairs = []
  for (const k in distance_pairs) {
    sorted_pairs.push([distance_pairs[k], k])
  }
  sorted_pairs.sort((a,b) => a[0]-b[0])
  //l(sorted_pairs.slice(0,10))
  const edges = {}
  let circuit_sets = {}
  let circuits = 0
  let ps
  if (t) {
    ps = sorted_pairs
    //ps = sorted_pairs.slice(0,10)
  } else {
    ps = sorted_pairs
  }
  for (const p of ps) {
    const [a, b] = p[1].split(':')
    // build the graph in both directions, so that we don't duplicate edges
    if (edges[a] && edges[a].e.indexOf(b) === -1 &&
        edges[b] && edges[b].e.indexOf(a) === -1) {
      l(`both nodes ${a}|${b} are already in circuits ${edges[a].circuit}|${edges[b].circuit}, adding edges`)
      if (edges[a].circuit !== edges[b].circuit) {
        l(` gotta combine two circuits!`)
        const circuit_to_remove = edges[b].circuit
        for (const k in edges) {
          if (edges[k].circuit === circuit_to_remove) {
            l(` setting edge  ${k} to be in circuit ${edges[a].circuit}`)
            l(` removing node ${k} from circuit ${circuit_to_remove}`)
            l(`-----`)
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
      l(`node ${a} is already in a circuit, adding ${b} to circuit ${edges[a].circuit}`)
      edges[b] = { circuit: edges[a].circuit, e: [a] }
      edges[a].e.push(b)
      circuit_sets[edges[a].circuit].add(b)
    } else if (edges[b]) {
      l(`node ${b} is already in a circuit, adding ${a} to circuit ${edges[b].circuit}`)
      edges[a] = { circuit: edges[b].circuit, e: [b] }
      edges[b].e.push(a)
      circuit_sets[edges[a].circuit].add(a)
    } else {
      l(`new circuit ${circuits}: ${a}|${b}`)
      edges[a] = { circuit: circuits, e: [b] }
      edges[b] = { circuit: circuits, e: [a] }
      circuit_sets[circuits] = new Set([a,b])
      circuits += 1
    }
  }
  l(edges)
  l(circuit_sets)

  const three_longest = []
  for(const k in circuit_sets) {
    three_longest.push(circuit_sets[k])
  }
  three_longest.sort((a,b) => b.size-a.size)
  l(three_longest.slice(0,3))
  return three_longest.slice(0,3).reduce((acc, value) => { return acc * value.size }, 1)
}
