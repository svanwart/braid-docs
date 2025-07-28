// Node.js script to calculate brain polygons
// Run with: node calculate-brain-polygons.js

const fs = require('fs')

// Graham's scan algorithm for convex hull
function convexHull(points) {
  if (points.length < 3) return points

  // Find the point with the lowest y-coordinate (and leftmost if tied)
  let lowest = 0
  for (let i = 1; i < points.length; i++) {
    if (
      points[i][1] < points[lowest][1] ||
      (points[i][1] === points[lowest][1] && points[i][0] < points[lowest][0])
    ) {
      lowest = i
    }
  }

  // Sort points by polar angle with respect to the lowest point
  const start = points[lowest]
  const sorted = points
    .filter((_, i) => i !== lowest)
    .sort((a, b) => {
      const angleA = Math.atan2(a[1] - start[1], a[0] - start[0])
      const angleB = Math.atan2(b[1] - start[1], b[0] - start[0])
      return angleA - angleB
    })

  // Graham's scan
  const hull = [start, sorted[0]]
  for (let i = 1; i < sorted.length; i++) {
    while (
      hull.length > 1 &&
      crossProduct(hull[hull.length - 2], hull[hull.length - 1], sorted[i]) <= 0
    ) {
      hull.pop()
    }
    hull.push(sorted[i])
  }

  return hull
}

// Cross product for determining turn direction
function crossProduct(o, a, b) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
}

// Calculate bounding box
function boundingBox(points) {
  if (points.length === 0) return []

  let minX = points[0][0],
    maxX = points[0][0]
  let minY = points[0][1],
    maxY = points[0][1]

  for (const [x, y] of points) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  return [
    [minX, minY],
    [maxX, minY],
    [maxX, maxY],
    [minX, maxY],
  ]
}

// Calculate area of a polygon
function polygonArea(polygon) {
  if (polygon.length < 3) return 0

  let area = 0
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length
    area += polygon[i][0] * polygon[j][1]
    area -= polygon[j][0] * polygon[i][1]
  }
  return Math.abs(area) / 2
}

// Main function
function main() {
  try {
    // Read the brain coordinates file
    const brainCoordsPath = './brain-coords.js'
    const brainCoordsContent = fs.readFileSync(brainCoordsPath, 'utf8')

    // Extract the flattenedPaths variable
    const match = brainCoordsContent.match(
      /const flattenedPaths = (\[[\s\S]*\]);/,
    )
    if (!match) {
      throw new Error('Could not find flattenedPaths in brain-coords.js')
    }

    // Evaluate the coordinates (in a safe way)
    const brainCoords = eval(match[1])

    // Flatten all coordinates from all paths
    const allPoints = []
    for (const path of brainCoords) {
      allPoints.push(...path)
    }

    console.log(`Total points: ${allPoints.length}`)
    console.log(`Number of paths: ${brainCoords.length}`)

    // Calculate different types of polygons
    const results = {
      convexHull: convexHull(allPoints),
      boundingBox: boundingBox(allPoints),
      metadata: {
        totalPoints: allPoints.length,
        numberOfPaths: brainCoords.length,
        bounds: {
          minX: Math.min(...allPoints.map((p) => p[0])),
          maxX: Math.max(...allPoints.map((p) => p[0])),
          minY: Math.min(...allPoints.map((p) => p[1])),
          maxY: Math.max(...allPoints.map((p) => p[1])),
        },
      },
    }

    // Calculate areas
    results.areas = {
      convexHull: polygonArea(results.convexHull),
      boundingBox: polygonArea(results.boundingBox),
    }

    console.log('\nResults:')
    console.log(
      `Convex Hull: ${results.convexHull.length} vertices, area: ${results.areas.convexHull.toFixed(2)}`,
    )
    console.log(
      `Bounding Box: ${results.boundingBox.length} vertices, area: ${results.areas.boundingBox.toFixed(2)}`,
    )

    // Save results to JSON file
    const outputPath = './brain-polygons.json'
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
    console.log(`\nResults saved to: ${outputPath}`)

    // Also save individual polygon files
    fs.writeFileSync(
      './brain-convex-hull.json',
      JSON.stringify(results.convexHull, null, 2),
    )
    fs.writeFileSync(
      './brain-bounding-box.json',
      JSON.stringify(results.boundingBox, null, 2),
    )

    console.log('Individual polygon files saved:')
    console.log('- brain-convex-hull.json')
    console.log('- brain-bounding-box.json')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}
