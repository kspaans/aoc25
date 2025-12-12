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


  let result = 0

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
  //l(distance_pairs)
  const sorted_pairs = []
  for (const k in distance_pairs) {
    sorted_pairs.push([distance_pairs[k], k])
    sorted_pairs.sort((a,b) => a[0]-b[0])
  }
  l(sorted_pairs)
  const edges = {}
  let circuit_sets = {}
  let circuits = 0
  for (const p of sorted_pairs.slice(0,15)) {
    const [a, b] = p[1].split(':')
    // build the graph in both directions, so that we don't duplicate edges
    if (edges[a] && edges[a].e.indexOf(b) === -1 &&
        edges[b] && edges[b].e.indexOf(a) === -1) {
      edges[a].e.push(b)
      edges[b].e.push(a)
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
  l(edges)
  l(circuit_sets)

  function dq(boxes) {
    if (boxes.length === 2) {
      l(` dq: distance between (${boxes[0]}):(${boxes[1]}) is ${dist3(boxes[0], boxes[1])}`)
    } else {
      dq(boxes.slice(0, Math.floor(boxes.length/2)))
    }
  }

  //dq(boxes)

  return result
}
