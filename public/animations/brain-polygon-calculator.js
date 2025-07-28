// Brain Polygon Calculator
// Calculates different types of surrounding polygons for brain coordinates

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

// Alpha shape algorithm (simplified version)
function alphaShape(points, alpha = 1.0) {
  if (points.length < 3) return points

  // For simplicity, we'll use a distance-based approach
  // This is a simplified version - for more precise alpha shapes,
  // you'd need a more complex triangulation algorithm

  const hull = convexHull(points)
  const result = [...hull]

  // Add points that are within alpha distance of the hull
  for (const point of points) {
    if (
      !hull.some(
        (hullPoint) =>
          Math.sqrt(
            (point[0] - hullPoint[0]) ** 2 + (point[1] - hullPoint[1]) ** 2,
          ) < alpha,
      )
    ) {
      result.push(point)
    }
  }

  return convexHull(result)
}

// Main function to calculate brain polygon
function calculateBrainPolygon(type = 'convex') {
  // Import the brain coordinates
  const brainCoords = flattenedPaths

  // Flatten all coordinates from all paths
  const allPoints = []
  for (const path of brainCoords) {
    allPoints.push(...path)
  }

  console.log(`Total points: ${allPoints.length}`)
  console.log(`Number of paths: ${brainCoords.length}`)

  let polygon
  switch (type) {
    case 'convex':
      polygon = convexHull(allPoints)
      console.log('Calculated convex hull polygon')
      break
    case 'bounding':
      polygon = boundingBox(allPoints)
      console.log('Calculated bounding box polygon')
      break
    case 'alpha':
      polygon = alphaShape(allPoints, 10.0)
      console.log('Calculated alpha shape polygon')
      break
    default:
      polygon = convexHull(allPoints)
      console.log('Calculated convex hull polygon (default)')
  }

  console.log(`Polygon has ${polygon.length} vertices`)
  console.log('Polygon coordinates:', polygon)

  return polygon
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    convexHull,
    boundingBox,
    alphaShape,
    calculateBrainPolygon,
  }
}

// If running in browser, make functions globally available
if (typeof window !== 'undefined') {
  window.brainPolygonCalculator = {
    convexHull,
    boundingBox,
    alphaShape,
    calculateBrainPolygon,
  }
}
