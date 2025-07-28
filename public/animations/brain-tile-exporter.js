// Brain Tile Exporter
// Exports tile data for the brain convex hull in various formats

// Import the polygon calculator functions
const { convexHull, boundingBox } = require('./brain-polygon-calculator.js')

// Point-in-polygon test using ray casting algorithm
function pointInPolygon(point, polygon) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (
      polygon[i][1] > point[1] !== polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      inside = !inside
    }
  }
  return inside
}

// Generate tiles that cover the polygon
function generateTiles(polygon, tileSize = 20) {
  if (!polygon || polygon.length < 3) return []

  // Find bounding box of the polygon
  let minX = polygon[0][0],
    maxX = polygon[0][0]
  let minY = polygon[0][1],
    maxY = polygon[0][1]

  for (const [x, y] of polygon) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  // Generate tiles
  const tiles = []
  for (let x = minX; x <= maxX; x += tileSize) {
    for (let y = minY; y <= maxY; y += tileSize) {
      // Check if tile center is inside polygon
      const centerX = x + tileSize / 2
      const centerY = y + tileSize / 2

      if (pointInPolygon([centerX, centerY], polygon)) {
        tiles.push({
          x: x,
          y: y,
          size: tileSize,
          centerX: centerX,
          centerY: centerY,
          id: `${Math.floor(x / tileSize)}_${Math.floor(y / tileSize)}`,
        })
      }
    }
  }

  return tiles
}

// Export tiles as JSON
function exportTilesAsJSON(tiles, filename = 'brain-tiles.json') {
  const fs = require('fs')
  const data = {
    tiles: tiles,
    metadata: {
      totalTiles: tiles.length,
      tileSize: tiles.length > 0 ? tiles[0].size : 20,
      generatedAt: new Date().toISOString(),
    },
  }

  fs.writeFileSync(filename, JSON.stringify(data, null, 2))
  console.log(`Tiles exported to ${filename}`)
  return data
}

// Export tiles as CSV
function exportTilesAsCSV(tiles, filename = 'brain-tiles.csv') {
  const fs = require('fs')
  const csvHeader = 'id,x,y,size,centerX,centerY\n'
  const csvRows = tiles
    .map(
      (tile) =>
        `${tile.id},${tile.x},${tile.y},${tile.size},${tile.centerX},${tile.centerY}`,
    )
    .join('\n')

  fs.writeFileSync(filename, csvHeader + csvRows)
  console.log(`Tiles exported to ${filename}`)
}

// Export tiles as SVG
function exportTilesAsSVG(tiles, filename = 'brain-tiles.svg') {
  const fs = require('fs')

  // Find bounds
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity
  for (const tile of tiles) {
    minX = Math.min(minX, tile.x)
    minY = Math.min(minY, tile.y)
    maxX = Math.max(maxX, tile.x + tile.size)
    maxY = Math.max(maxY, tile.y + tile.size)
  }

  const width = maxX - minX
  const height = maxY - minY

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .tile { fill: #4CAF50; stroke: #2E7D32; stroke-width: 1; }
      .tile:hover { fill: #66BB6A; }
    </style>
  </defs>
  ${tiles
    .map(
      (tile) =>
        `<rect class="tile" x="${tile.x - minX}" y="${tile.y - minY}" width="${tile.size}" height="${tile.size}" data-id="${tile.id}"/>`,
    )
    .join('\n  ')}
</svg>`

  fs.writeFileSync(filename, svgContent)
  console.log(`Tiles exported to ${filename}`)
}

// Export tiles as HTML with interactive visualization
function exportTilesAsHTML(tiles, filename = 'brain-tiles.html') {
  const fs = require('fs')

  // Find bounds
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity
  for (const tile of tiles) {
    minX = Math.min(minX, tile.x)
    minY = Math.min(minY, tile.y)
    maxX = Math.max(maxX, tile.x + tile.size)
    maxY = Math.max(maxY, tile.y + tile.size)
  }

  const width = maxX - minX
  const height = maxY - minY
  const scale = Math.min(800 / width, 600 / height)

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brain Tiles Visualization</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            padding: 15px;
            background: #e9ecef;
            border-radius: 5px;
        }
        .stat {
            text-align: center;
        }
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .stat-label {
            font-size: 14px;
            color: #666;
        }
        svg {
            display: block;
            margin: 20px auto;
            border: 1px solid #ddd;
            background: white;
        }
        .tile {
            fill: #4CAF50;
            stroke: #2E7D32;
            stroke-width: 1;
            transition: fill 0.2s;
        }
        .tile:hover {
            fill: #66BB6A;
            cursor: pointer;
        }
        .tile-info {
            position: fixed;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Brain Tiles Visualization</h1>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${tiles.length}</div>
                <div class="stat-label">Total Tiles</div>
            </div>
            <div class="stat">
                <div class="stat-value">${tiles.length > 0 ? tiles[0].size : 20}px</div>
                <div class="stat-label">Tile Size</div>
            </div>
            <div class="stat">
                <div class="stat-value">${Math.round((width * height) / (tiles.length > 0 ? tiles[0].size * tiles[0].size : 400))}%</div>
                <div class="stat-label">Coverage</div>
            </div>
        </div>
        
        <svg width="${width * scale}" height="${height * scale}" viewBox="${minX} ${minY} ${width} ${height}">
            ${tiles
              .map(
                (tile) =>
                  `<rect class="tile" x="${tile.x}" y="${tile.y}" width="${tile.size}" height="${tile.size}" 
                     data-id="${tile.id}" data-x="${tile.x}" data-y="${tile.y}" data-center-x="${tile.centerX}" data-center-y="${tile.centerY}"/>`,
              )
              .join('\n            ')}
        </svg>
    </div>
    
    <div class="tile-info" id="tileInfo"></div>
    
    <script>
        const tiles = ${JSON.stringify(tiles)};
        const tileInfo = document.getElementById('tileInfo');
        
        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('mouseover', (e) => {
                const rect = e.target;
                const x = rect.getAttribute('data-x');
                const y = rect.getAttribute('data-y');
                const centerX = rect.getAttribute('data-center-x');
                const centerY = rect.getAttribute('data-center-y');
                const id = rect.getAttribute('data-id');
                
                tileInfo.innerHTML = \`
                    <strong>Tile ID:</strong> \${id}<br>
                    <strong>Position:</strong> (\${x}, \${y})<br>
                    <strong>Center:</strong> (\${centerX}, \${centerY})<br>
                    <strong>Size:</strong> \${rect.getAttribute('width')}px
                \`;
                tileInfo.style.display = 'block';
            });
            
            tile.addEventListener('mousemove', (e) => {
                tileInfo.style.left = e.pageX + 10 + 'px';
                tileInfo.style.top = e.pageY - 10 + 'px';
            });
            
            tile.addEventListener('mouseout', () => {
                tileInfo.style.display = 'none';
            });
        });
    </script>
</body>
</html>`

  fs.writeFileSync(filename, htmlContent)
  console.log(`Tiles exported to ${filename}`)
}

// Main function to generate and export tiles
function generateAndExportTiles(tileSize = 20) {
  try {
    // Read the brain coordinates file
    const fs = require('fs')
    const brainCoordsPath = './brain-coords.js'
    const brainCoordsContent = fs.readFileSync(brainCoordsPath, 'utf8')

    // Extract the flattenedPaths variable
    const match = brainCoordsContent.match(
      /const flattenedPaths = (\[[\s\S]*\]);/,
    )
    if (!match) {
      throw new Error('Could not find flattenedPaths in brain-coords.js')
    }

    // Evaluate the coordinates
    const brainCoords = eval(match[1])

    // Flatten all coordinates from all paths
    const allPoints = []
    for (const path of brainCoords) {
      allPoints.push(...path)
    }

    console.log(`Total brain points: ${allPoints.length}`)
    console.log(`Number of brain paths: ${brainCoords.length}`)

    // Calculate convex hull
    const convexHullPolygon = convexHull(allPoints)
    console.log(`Convex hull has ${convexHullPolygon.length} vertices`)

    // Generate tiles
    const tiles = generateTiles(convexHullPolygon, tileSize)
    console.log(`Generated ${tiles.length} tiles with size ${tileSize}px`)

    // Export in different formats
    exportTilesAsJSON(tiles, `brain-tiles-${tileSize}px.json`)
    exportTilesAsCSV(tiles, `brain-tiles-${tileSize}px.csv`)
    exportTilesAsSVG(tiles, `brain-tiles-${tileSize}px.svg`)
    exportTilesAsHTML(tiles, `brain-tiles-${tileSize}px.html`)

    return tiles
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateTiles,
    exportTilesAsJSON,
    exportTilesAsCSV,
    exportTilesAsSVG,
    exportTilesAsHTML,
    generateAndExportTiles,
  }
}

// Run the script if called directly
if (require.main === module) {
  const tileSize = process.argv[2] ? parseInt(process.argv[2]) : 20
  generateAndExportTiles(tileSize)
}
