// Network configuration
const INPUT_COUNT = 3
const LAYER_COUNT = 7
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const NODE_SIZE = 25
const PAUSE_FRAMES = 60
const FIRING_THRESHOLD = 2
const SPIKE_PAUSE_FRAMES = 30 // 1 second pause after each spike (30 fps)
const FINAL_STATE_PAUSE_FRAMES = 90 // 3 seconds pause for final state

// STDP parameters
const STDP_TAU_POS = 20 // Time constant for LTP (Long-Term Potentiation)
const STDP_TAU_NEG = 20 // Time constant for LTD (Long-Term Depression)
const STDP_A_POS = 0.01 // Learning rate for LTP
const STDP_A_NEG = 0.01 // Learning rate for LTD
const STDP_MAX_WEIGHT = 2.0 // Maximum weight
const STDP_MIN_WEIGHT = 0.01 // Minimum weight

// Spike timing examples - RGB color representations
const spikeTrains = [
  // Six shades of red (high R, low G, low B)
  [15, 5, 3], // Bright red
  [14, 4, 2], // Medium red
  [13, 3, 1], // Dark red
  [12, 2, 1], // Deep red
  [11, 1, 1], // Very dark red
  [10, 1, 1], // Almost black-red

  // Six shades of purple (high R, low G, high B)
  [15, 3, 14], // Bright purple
  [14, 2, 13], // Medium purple
  [13, 2, 12], // Dark purple
  [12, 1, 11], // Deep purple
  [11, 1, 10], // Very dark purple
  [10, 1, 9], // Almost black-purple

  // Six shades of yellow (high R, high G, low B)
  [15, 15, 3], // Bright yellow
  [14, 14, 2], // Medium yellow
  [13, 13, 1], // Dark yellow
  [12, 12, 1], // Deep yellow
  [11, 11, 1], // Very dark yellow
  [10, 10, 1], // Almost black-yellow
]

// Network state
let layers = { input: [], excitatory: [], inhibitory: [], output: [] }
let currentExample = 0
let spikes = spikeTrains[currentExample]
let timer = 0
let pauseCounter = 0
let spikePauseCounter = 0
let finalStatePauseCounter = 0
let lastSpikedIndex = -1

// STDP spike timing tracking
let lastInputSpikeTimes = new Array(INPUT_COUNT).fill(-1)
let lastExcitatorySpikeTimes = new Array(LAYER_COUNT).fill(-1)

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  frameRate(15)
  initNetwork()
}

function initNetwork() {
  const layerSpacing = width / 5
  const nodeSpacing = 60

  // Create input neurons (3)
  for (let i = 0; i < INPUT_COUNT; i++) {
    const y = 80 + i * nodeSpacing
    layers.input.push({
      x: layerSpacing * 1,
      y,
      spiked: false,
      visualSpike: false,
    })
  }

  // Create excitatory and inhibitory neurons (7 each)
  for (let i = 0; i < LAYER_COUNT; i++) {
    const y = 80 + i * nodeSpacing

    layers.excitatory.push({ x: layerSpacing * 2, y, active: false })
    layers.inhibitory.push({ x: layerSpacing * 3, y, active: false })
  }

  layers.output.push({ x: layerSpacing * 4, y: height / 2, active: false })

  // Initialize weights
  initWeights()
}

function initWeights() {
  // Initialize weights between input and excitatory neurons
  layers.inputToExcitatoryWeights = []
  for (let i = 0; i < INPUT_COUNT; i++) {
    layers.inputToExcitatoryWeights[i] = []
    for (let j = 0; j < LAYER_COUNT; j++) {
      layers.inputToExcitatoryWeights[i][j] = 0.1 + Math.random() * 0.9 // Random weight between 0.1 and 1.0
    }
  }

  // Initialize weights between excitatory and inhibitory neurons
  layers.excitatoryToInhibitoryWeights = []
  for (let i = 0; i < LAYER_COUNT; i++) {
    layers.excitatoryToInhibitoryWeights[i] = 0.1 + Math.random() * 0.9
  }

  // Initialize weights for cross-inhibition
  layers.inhibitoryToExcitatoryWeights = []
  for (let i = 0; i < LAYER_COUNT; i++) {
    layers.inhibitoryToExcitatoryWeights[i] = []
    for (let j = 0; j < LAYER_COUNT; j++) {
      if (i !== j) {
        layers.inhibitoryToExcitatoryWeights[i][j] = 0.1 + Math.random() * 0.9
      } else {
        layers.inhibitoryToExcitatoryWeights[i][j] = 0 // No self-inhibition
      }
    }
  }

  // Initialize weights between excitatory and output neurons
  layers.excitatoryToOutputWeights = []
  for (let i = 0; i < LAYER_COUNT; i++) {
    layers.excitatoryToOutputWeights[i] = 0.1 + Math.random() * 0.9
  }
}

function draw() {
  background(255)
  drawConnections()
  drawNetwork()
  drawInfo()
  simulateSpikes()
}

function simulateSpikes() {
  if (pauseCounter > 0) {
    pauseCounter--
    return
  }

  if (finalStatePauseCounter > 0) {
    finalStatePauseCounter--
    // Check if final state pause is done and advance to next example
    if (finalStatePauseCounter === 0) {
      pauseCounter = PAUSE_FRAMES
      timer = 0
      currentExample = (currentExample + 1) % spikeTrains.length
      spikes = spikeTrains[currentExample]
      resetActivity()
      lastSpikedIndex = -1
    }
    return
  }

  // Reset all neuron states
  layers.excitatory.forEach((n) => (n.active = false))
  layers.inhibitory.forEach((n) => (n.active = false))

  // Activate neurons based on spike timing
  for (let i = 0; i < INPUT_COUNT; i++) {
    if (timer === spikes[i]) {
      layers.input[i].spiked = true
      layers.input[i].visualSpike = true
      // Activate all excitatory neurons when this input spikes
      for (let j = 0; j < LAYER_COUNT; j++) {
        layers.excitatory[j].active = true
      }
      lastSpikedIndex = i

      // Apply STDP learning
      applySTDP(i)
    }

    // Turn off visual spike after 3 frames, but keep spiked state for tracking
    if (layers.input[i].visualSpike && timer > spikes[i] + 3) {
      layers.input[i].visualSpike = false
    }
  }

  // Update excitatory spike times
  updateExcitatorySpikeTimes()

  // Weight-based winner-takes-all: excitatory neuron with strongest weighted input wins
  let maxActivation = 0
  let winnerIndex = -1

  for (let i = 0; i < LAYER_COUNT; i++) {
    if (layers.excitatory[i].active) {
      // Calculate weighted activation for this excitatory neuron
      let activation = 0
      for (let j = 0; j < INPUT_COUNT; j++) {
        if (layers.input[j].spiked) {
          activation += layers.inputToExcitatoryWeights[j][i]
        }
      }

      if (activation > maxActivation) {
        maxActivation = activation
        winnerIndex = i
      }
    }
  }

  if (winnerIndex !== -1) {
    layers.inhibitory[winnerIndex].active = true
    // Suppress all other excitatory neurons
    layers.excitatory.forEach((n, i) => {
      if (i !== winnerIndex) n.active = false
    })
  }

  // Check if all neurons have spiked
  const allSpiked = layers.input.every((n) => n.spiked)
  if (allSpiked) {
    const spikeTimes = layers.input.map((n, i) => (n.spiked ? spikes[i] : null))
    const timeDiff = Math.max(...spikeTimes) - Math.min(...spikeTimes)

    if (timeDiff <= FIRING_THRESHOLD * 5) {
      layers.output[0].active = true
    }

    // Pause to show final state before moving to next example
    finalStatePauseCounter = FINAL_STATE_PAUSE_FRAMES
    return
  }

  timer++
}

function resetActivity() {
  for (let i = 0; i < INPUT_COUNT; i++) {
    layers.input[i].spiked = false
    layers.input[i].visualSpike = false
  }
  for (let i = 0; i < LAYER_COUNT; i++) {
    layers.excitatory[i].active = false
    layers.inhibitory[i].active = false
  }
  layers.output[0].active = false

  // Reset STDP spike timing tracking
  lastInputSpikeTimes.fill(-1)
  lastExcitatorySpikeTimes.fill(-1)
}

function drawConnections() {
  // Helper function to convert weight to line width on log scale
  function weightToWidth(weight) {
    const minWeight = 0.1
    const maxWeight = 1.0
    const minWidth = 1
    const maxWidth = 3

    // Log scale transformation
    const logWeight = Math.log(weight / minWeight)
    const logMax = Math.log(maxWeight / minWeight)
    const normalized = logWeight / logMax

    return minWidth + normalized * (maxWidth - minWidth)
  }

  // Connect each input neuron to all excitatory neurons
  for (let i = 0; i < INPUT_COUNT; i++) {
    for (let j = 0; j < LAYER_COUNT; j++) {
      // Input → Excitatory
      stroke(0, 0, 255, 100)
      strokeWeight(weightToWidth(layers.inputToExcitatoryWeights[i][j]))
      line(
        layers.input[i].x,
        layers.input[i].y,
        layers.excitatory[j].x,
        layers.excitatory[j].y,
      )
    }
  }

  // Connect all excitatory and inhibitory neurons
  for (let i = 0; i < LAYER_COUNT; i++) {
    // Excitatory → Inhibitory
    stroke(0, 150, 255, 120)
    strokeWeight(weightToWidth(layers.excitatoryToInhibitoryWeights[i]))
    line(
      layers.excitatory[i].x,
      layers.excitatory[i].y,
      layers.inhibitory[i].x,
      layers.inhibitory[i].y,
    )

    // Cross-inhibition
    stroke(255, 0, 0, 80)
    for (let j = 0; j < LAYER_COUNT; j++) {
      if (i !== j) {
        strokeWeight(weightToWidth(layers.inhibitoryToExcitatoryWeights[i][j]))
        line(
          layers.inhibitory[i].x,
          layers.inhibitory[i].y,
          layers.excitatory[j].x,
          layers.excitatory[j].y,
        )
      }
    }

    // Excitatory → Output
    stroke(0, 200, 0, 100)
    strokeWeight(weightToWidth(layers.excitatoryToOutputWeights[i]))
    line(
      layers.excitatory[i].x,
      layers.excitatory[i].y,
      layers.output[0].x,
      layers.output[0].y,
    )
  }
}

function drawNetwork() {
  drawLayer(layers.input, 'gray', 'Input')
  drawLayer(layers.excitatory, 'blue', 'Excitatory')
  drawLayer(layers.inhibitory, 'red', 'Inhibitory')

  // Determine output color based on anomaly detection
  let outputColor = 'white'
  const allSpiked = layers.input.every((n) => n.spiked)
  if (allSpiked) {
    const spikeTimes = layers.input.map((n, i) => (n.spiked ? spikes[i] : null))
    const timeDiff = Math.max(...spikeTimes) - Math.min(...spikeTimes)
    const isNormal = timeDiff <= FIRING_THRESHOLD * 5
    outputColor = isNormal ? 'white' : 'red'
  }

  drawLayer(layers.output, outputColor, 'Output')
}

function drawLayer(nodes, color, label) {
  textAlign(CENTER)
  textSize(12)
  noStroke()
  fill(0)
  if (nodes.length > 0) text(label, nodes[0].x, 30)

  nodes.forEach((node) => {
    stroke(0)
    // Use visualSpike for input neurons, active/spiked for others
    const isActive =
      label === 'Input' ? node.visualSpike : node.active || node.spiked
    fill(isActive ? color : 'white')
    ellipse(node.x, node.y, NODE_SIZE)
  })
}

function drawInfo() {
  textAlign(LEFT)
  textSize(14)
  noStroke()
  fill(0)

  // Display current example and timer
  text(`Example ${currentExample + 1}/${spikeTrains.length}`, 20, 30)
  text(`Timer: ${timer}`, 20, 50)

  // Display current spike train
  text(`Spike Train: [${spikes.join(', ')}]`, 20, 70)

  // Display which neurons have spiked
  const spikedNeurons = []
  for (let i = 0; i < INPUT_COUNT; i++) {
    if (layers.input[i].spiked) {
      spikedNeurons.push(i)
    }
  }
  text(`Spiked: [${spikedNeurons.join(', ')}]`, 20, 90)

  // Display winner information
  const winnerIndex = layers.excitatory.findIndex((n) => n.active)
  if (winnerIndex !== -1) {
    text(`Winner: Neuron ${winnerIndex}`, 20, 110)
  }

  // Display anomaly detection only in final state
  const allSpiked = layers.input.every((n) => n.spiked)
  if (allSpiked) {
    const spikeTimes = layers.input.map((n, i) => (n.spiked ? spikes[i] : null))
    const timeDiff = Math.max(...spikeTimes) - Math.min(...spikeTimes)
    const isNormal = timeDiff <= FIRING_THRESHOLD * 5

    text(`Detection: ${isNormal ? 'NORMAL' : 'ANOMALY'}`, 20, 130)
    text(`Time Diff: ${timeDiff}`, 20, 150)
  }
}

function applySTDP(inputIndex) {
  // Update input spike time
  lastInputSpikeTimes[inputIndex] = timer

  // Apply STDP to all excitatory neurons
  for (let j = 0; j < LAYER_COUNT; j++) {
    if (lastExcitatorySpikeTimes[j] !== -1) {
      // Calculate time difference: input spike time - excitatory spike time
      const deltaT =
        lastInputSpikeTimes[inputIndex] - lastExcitatorySpikeTimes[j]

      let weightChange = 0

      if (deltaT > 0) {
        // Input spiked after excitatory (LTP - strengthen connection)
        weightChange = STDP_A_POS * Math.exp(-deltaT / STDP_TAU_POS)
      } else if (deltaT < 0) {
        // Input spiked before excitatory (LTD - weaken connection)
        weightChange = -STDP_A_NEG * Math.exp(deltaT / STDP_TAU_NEG)
      }

      // Apply weight change with bounds
      layers.inputToExcitatoryWeights[inputIndex][j] += weightChange
      layers.inputToExcitatoryWeights[inputIndex][j] = Math.max(
        STDP_MIN_WEIGHT,
        Math.min(
          STDP_MAX_WEIGHT,
          layers.inputToExcitatoryWeights[inputIndex][j],
        ),
      )
    }
  }
}

function updateExcitatorySpikeTimes() {
  // Update excitatory spike times when they become active
  for (let i = 0; i < LAYER_COUNT; i++) {
    if (layers.excitatory[i].active && lastExcitatorySpikeTimes[i] === -1) {
      lastExcitatorySpikeTimes[i] = timer
    }
  }
}
