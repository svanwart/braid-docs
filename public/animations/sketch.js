// Auto-generated from SVG -> lines (flattened curves)
// 10 subpaths
// ViewBox: x[34.78, 505.28] y[21.63, 404.32]

function setup() {
  createCanvas(1000, 1000)
  background(255)
  stroke(0)
  noFill()
}

function draw() {
  background(255)
  const minX = 34.776520032986106
  const maxX = 505.28047559259255
  const minY = 21.634040653139465
  const maxY = 404.315398671875
  const margin = 50
  const w = width - margin * 2
  const h = height - margin * 2
  const sx = w / (maxX - minX)
  const sy = h / (maxY - minY)
  const s = Math.min(sx, sy)

  push()
  translate(margin, margin)
  scale(0.5)
  // Flip Y if your SVG has origin at top-left; p5 also has origin at top-left, so we keep it.
  for (let path of flattenedPaths) {
    for (let i = 1; i < path.length; i++) {
      const x1 = (path[i - 1][0] - minX) * s
      const y1 = (path[i - 1][1] - minY) * s
      const x2 = (path[i][0] - minX) * s
      const y2 = (path[i][1] - minY) * s
      line(x1, y1, x2, y2)
    }
  }
  pop()
  noLoop()
}
