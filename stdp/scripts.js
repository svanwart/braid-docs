// Network configuration
const INPUT_COUNT = 3
const LAYER_COUNT = 15
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800
const NODE_SIZE = 20
const PAUSE_FRAMES = 0
const FIRING_THRESHOLD = 2
const SPIKE_PAUSE_FRAMES = 30 // 1 second pause after each spike (30 fps)
const FINAL_STATE_PAUSE_FRAMES = 20 // 3 seconds pause for final state

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
  [15, 5, 3], // Bright red

  // // Six shades of purple (high R, low G, high B)
  // [15, 3, 14], // Bright purple
  // [14, 2, 13], // Medium purple
  // [13, 2, 12], // Dark purple
  // [12, 1, 11], // Deep purple
  // [11, 1, 10], // Very dark purple
  // [10, 1, 9], // Almost black-purple

  // // Six shades of yellow (high R, high G, low B)
  // [15, 15, 3], // Bright yellow
  // [14, 14, 2], // Medium yellow
  // [13, 13, 1], // Dark yellow
  // [12, 12, 1], // Deep yellow
  // [11, 11, 1], // Very dark yellow
  // [10, 10, 1], // Almost black-yellow
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
let lastOutputSpikeTime = -1

// Particle system for spike visualization
let particles = []
let particlePhase = 'waiting' // 'waiting', 'input-to-excitatory', 'excitatory-to-inhibitory', 'inhibitory-to-excitatory', 'output'
let currentSpikeIndex = 0
let phaseTimer = 0
let PHASE_DELAY = 5 // frames between phases (reduced from 30)
let PARTICLE_SPEED = 0.08 // increased speed for faster movement
let activatedInhibitoryNeurons = [] // Track which inhibitory neurons were actually activated
let activatedExcitatoryNeurons = [] // Track which excitatory neurons received input from current spike

// ============================================================================
// NETWORK LOGIC (Weights, Edges, Simulation)
// ============================================================================

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  frameRate(15)
  initNetwork()
}

function initNetwork() {
  const layerSpacing = (width - 200) / 6 // Reserve 200px on left for stats, divide remaining space by 6
  const nodeSpacing = 50 // Increased from 40 to 50

  // Create input neurons (3) - start further to the right
  for (let i = 0; i < INPUT_COUNT; i++) {
    const y = 100 + i * nodeSpacing // Increased from 80 to 100
    layers.input.push({
      x: 200 + layerSpacing * 1, // Start at 200px from left edge
      y,
      spiked: false,
      visualSpike: false,
    })
  }

  // Create excitatory and inhibitory neurons (15 each)
  for (let i = 0; i < LAYER_COUNT; i++) {
    const y = 100 + i * nodeSpacing // Increased from 80 to 100

    layers.excitatory.push({ x: 200 + layerSpacing * 2, y, active: false })
    layers.inhibitory.push({ x: 200 + layerSpacing * 3, y, active: false })
  }

  layers.output.push({
    x: 200 + layerSpacing * 4,
    y: height / 2,
    active: false,
  })

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

  // Pause simulation during particle propagation
  if (particlePhase !== 'waiting' && particles.length > 0) {
    console.log(
      `Simulation paused: phase=${particlePhase}, particles=${particles.length}`,
    )
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

      // Multi-neuron activation: allow multiple excitatory neurons to fire based on weights
      const baseThreshold = 0.6 // Base activation threshold
      const noise = (Math.random() - 0.5) * 0.2 // Add ±0.1 noise to threshold
      const threshold = baseThreshold + noise
      let totalActivation = 0

      // Calculate total activation and activate neurons above threshold
      for (let j = 0; j < LAYER_COUNT; j++) {
        const weight = layers.inputToExcitatoryWeights[i][j]
        if (weight > threshold) {
          layers.excitatory[j].active = true
          layers.inhibitory[j].active = true // Activate corresponding inhibitory neuron
          totalActivation += weight
        }
      }

      // If no neurons are above threshold, activate the strongest one
      if (totalActivation === 0) {
        let maxWeight = 0
        let winnerIndex = 0

        for (let j = 0; j < LAYER_COUNT; j++) {
          const weight = layers.inputToExcitatoryWeights[i][j]
          if (weight > maxWeight) {
            maxWeight = weight
            winnerIndex = j
          }
        }

        layers.excitatory[winnerIndex].active = true
        layers.inhibitory[winnerIndex].active = true // Activate corresponding inhibitory neuron
      }

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

  // Update output spike time
  updateOutputSpikeTime()

  // Check if all neurons have spiked
  const allSpiked = layers.input.every((n) => n.spiked)
  if (allSpiked && particlePhase === 'waiting') {
    const spikeTimes = layers.input.map((n, i) => (n.spiked ? spikes[i] : null))
    const timeDiff = Math.max(...spikeTimes) - Math.min(...spikeTimes)

    console.log(
      `All spiked! TimeDiff: ${timeDiff}, Threshold: ${FIRING_THRESHOLD * 5}`,
    )

    if (timeDiff <= FIRING_THRESHOLD * 5) {
      layers.output[0].active = true
      console.log('Output neuron activated (normal)')
    } else {
      layers.output[0].active = false
      console.log('Output neuron not activated (anomaly)')
    }

    // Apply STDP learning for excitatory-to-output connections
    applySTDPExcitatoryToOutput()

    // Don't immediately pause - let particle system run first
    // finalStatePauseCounter = FINAL_STATE_PAUSE_FRAMES
    // return
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
  layers.output[0].active = false // Reset output to inactive (will show white)

  // Reset STDP spike timing tracking
  lastInputSpikeTimes.fill(-1)
  lastExcitatorySpikeTimes.fill(-1)
  lastOutputSpikeTime = -1

  // Reset particle system
  particles = []
  particlePhase = 'waiting'
  currentSpikeIndex = 0
  phaseTimer = 0
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

  // Add weight normalization to prevent runaway growth
  normalizeWeights(inputIndex)
}

function normalizeWeights(inputIndex) {
  // Calculate total weight strength for this input
  let totalWeight = 0
  for (let j = 0; j < LAYER_COUNT; j++) {
    totalWeight += layers.inputToExcitatoryWeights[inputIndex][j]
  }

  // Normalize weights to maintain constant total strength
  const targetTotal = LAYER_COUNT * 0.5 // Target average weight of 0.5
  if (totalWeight > 0) {
    for (let j = 0; j < LAYER_COUNT; j++) {
      layers.inputToExcitatoryWeights[inputIndex][j] =
        (layers.inputToExcitatoryWeights[inputIndex][j] / totalWeight) *
        targetTotal
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

function updateOutputSpikeTime() {
  // Update output spike time when it becomes active
  if (layers.output[0].active && lastOutputSpikeTime === -1) {
    lastOutputSpikeTime = timer
  }
}

function applySTDPExcitatoryToOutput() {
  // Apply STDP to excitatory-to-output connections
  for (let i = 0; i < LAYER_COUNT; i++) {
    if (lastExcitatorySpikeTimes[i] !== -1 && lastOutputSpikeTime !== -1) {
      // Calculate time difference: excitatory spike time - output spike time
      const deltaT = lastExcitatorySpikeTimes[i] - lastOutputSpikeTime

      let weightChange = 0

      if (deltaT > 0) {
        // Excitatory spiked after output (LTP - strengthen connection)
        weightChange = STDP_A_POS * Math.exp(-deltaT / STDP_TAU_POS)
      } else if (deltaT < 0) {
        // Excitatory spiked before output (LTD - weaken connection)
        weightChange = -STDP_A_NEG * Math.exp(deltaT / STDP_TAU_NEG)
      }

      // Apply weight change with bounds
      layers.excitatoryToOutputWeights[i] += weightChange
      layers.excitatoryToOutputWeights[i] = Math.max(
        STDP_MIN_WEIGHT,
        Math.min(STDP_MAX_WEIGHT, layers.excitatoryToOutputWeights[i]),
      )
    }
  }
}

// ============================================================================
// PARTICLE SYSTEM FOR SPIKE VISUALIZATION
// ============================================================================

class Particle {
  constructor(startX, startY, endX, endY, type, weight) {
    this.x = startX
    this.y = startY
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY
    this.type = type // 'input-excitatory', 'excitatory-inhibitory', 'inhibitory-excitatory', 'excitatory-output'
    this.weight = weight
    this.progress = 0
    this.speed = PARTICLE_SPEED // Constant speed for all particles
    this.size = 4 // Fixed size for all particles
    this.alpha = 255
    this.life = 1.0
  }

  update() {
    this.progress += this.speed
    this.life -= 0.01 // Slower fade

    if (this.progress >= 1) {
      this.progress = 1
    }

    // Interpolate position
    this.x = lerp(this.startX, this.endX, this.progress)
    this.y = lerp(this.startY, this.endY, this.progress)

    // Update alpha based on life
    this.alpha = 255 * this.life

    return this.progress >= 1 || this.life <= 0
  }

  draw() {
    push()
    noStroke()

    // Set color based on type
    switch (this.type) {
      case 'input-excitatory':
        fill(0, 0, 255, this.alpha) // Blue
        break
      case 'excitatory-inhibitory':
        fill(0, 150, 255, this.alpha) // Light blue
        break
      case 'inhibitory-excitatory':
        fill(255, 0, 0, this.alpha) // Red
        break
      case 'excitatory-output':
        fill(0, 200, 0, this.alpha) // Green
        break
    }

    // Draw particle with glow effect
    ellipse(this.x, this.y, this.size * 2)
    fill(255, 255, 255, this.alpha * 0.5)
    ellipse(this.x, this.y, this.size)
    pop()
  }
}

function createSpikeParticles(inputIndex) {
  console.log(`createSpikeParticles called with inputIndex: ${inputIndex}`)
  console.log(
    `Input node ${inputIndex} position: (${layers.input[inputIndex].x}, ${layers.input[inputIndex].y})`,
  )

  // Reset all neuron states for this spike
  layers.excitatory.forEach((n) => (n.active = false))
  layers.inhibitory.forEach((n) => (n.active = false))
  activatedExcitatoryNeurons = [] // Reset for this spike

  // Create particles for input to excitatory connections
  for (let j = 0; j < LAYER_COUNT; j++) {
    const weight = layers.inputToExcitatoryWeights[inputIndex][j]
    if (weight > 0.3) {
      // Only create particles for significant connections
      console.log(
        `Creating particle from input ${inputIndex} to excitatory ${j} with weight ${weight}`,
      )
      const particle = new Particle(
        layers.input[inputIndex].x,
        layers.input[inputIndex].y,
        layers.excitatory[j].x,
        layers.excitatory[j].y,
        'input-excitatory',
        weight,
      )
      particles.push(particle)

      // Mark this excitatory neuron as receiving input from current spike
      activatedExcitatoryNeurons.push(j)
    }
  }

  console.log(
    `Excitatory neurons receiving input from spike ${inputIndex}: [${activatedExcitatoryNeurons.join(', ')}]`,
  )
}

function createExcitatoryParticles() {
  console.log('createExcitatoryParticles called')
  let activatedCount = 0
  let particleCount = 0
  activatedInhibitoryNeurons = [] // Reset for this phase

  // Create particles for excitatory to inhibitory connections
  // Only activate excitatory neurons that actually received input from current spike
  for (let i of activatedExcitatoryNeurons) {
    layers.excitatory[i].active = true
    activatedCount++
    const weight = layers.excitatoryToInhibitoryWeights[i]

    // Only create inhibitory particle if the weight is significant
    if (weight > 0.3) {
      const particle = new Particle(
        layers.excitatory[i].x,
        layers.excitatory[i].y,
        layers.inhibitory[i].x,
        layers.inhibitory[i].y,
        'excitatory-inhibitory',
        weight,
      )
      particles.push(particle)
      particleCount++

      // Mark this inhibitory neuron as activated
      activatedInhibitoryNeurons.push(i)
    }
  }

  console.log(
    `Activated ${activatedCount} excitatory neurons, created ${particleCount} particles`,
  )
  console.log(
    `Activated inhibitory neurons: [${activatedInhibitoryNeurons.join(', ')}]`,
  )
}

function createInhibitoryParticles() {
  console.log('createInhibitoryParticles called')
  let activatedCount = 0
  let particleCount = 0

  // Create particles for inhibitory to excitatory connections (cross-inhibition)
  // Only use inhibitory neurons that were actually activated in the previous phase
  for (let i of activatedInhibitoryNeurons) {
    layers.inhibitory[i].active = true
    activatedCount++

    for (let j = 0; j < LAYER_COUNT; j++) {
      if (i !== j) {
        const weight = layers.inhibitoryToExcitatoryWeights[i][j]
        if (weight > 0.3) {
          const particle = new Particle(
            layers.inhibitory[i].x,
            layers.inhibitory[i].y,
            layers.excitatory[j].x,
            layers.excitatory[j].y,
            'inhibitory-excitatory',
            weight,
          )
          particles.push(particle)
          particleCount++
        }
      }
    }
  }

  console.log(
    `Activated ${activatedCount} inhibitory neurons, created ${particleCount} particles`,
  )
  console.log(
    `Using inhibitory neurons: [${activatedInhibitoryNeurons.join(', ')}]`,
  )
}

function createOutputParticles() {
  // Create particles for excitatory to output connections
  for (let i = 0; i < LAYER_COUNT; i++) {
    if (layers.excitatory[i].active) {
      const weight = layers.excitatoryToOutputWeights[i]
      const particle = new Particle(
        layers.excitatory[i].x,
        layers.excitatory[i].y,
        layers.output[0].x,
        layers.output[0].y,
        'excitatory-output',
        weight,
      )
      particles.push(particle)
    }
  }
}

function startParticleSequence() {
  // Only start particle sequence when ALL spikes have been detected
  const allSpiked = layers.input.every((n) => n.spiked)
  if (particlePhase === 'waiting' && allSpiked) {
    console.log(
      `All spikes detected! Starting particle sequence for spike ${currentSpikeIndex} at timer ${timer}`,
    )
    particlePhase = 'input-to-excitatory'
    phaseTimer = 0
  }
}

function manageParticleSequence() {
  // Check if all particles have completed their journey
  const allParticlesComplete = particles.every((p) => p.progress >= 1)

  if (
    (allParticlesComplete && particles.length > 0) ||
    (particles.length === 0 && particlePhase !== 'waiting')
  ) {
    console.log(`Phase ${particlePhase} complete, moving to next phase`)
    // Clear completed particles
    particles = []
    phaseTimer = 0

    // Move to next phase
    switch (particlePhase) {
      case 'input-to-excitatory':
        particlePhase = 'excitatory-to-inhibitory'
        break
      case 'excitatory-to-inhibitory':
        particlePhase = 'inhibitory-to-excitatory'
        break
      case 'inhibitory-to-excitatory':
        // Check if we should move to next spike or output phase
        if (currentSpikeIndex < INPUT_COUNT - 1) {
          currentSpikeIndex++
          particlePhase = 'input-to-excitatory'
          console.log(
            `Moving to next spike: ${currentSpikeIndex}, spike time: ${spikes[currentSpikeIndex]}`,
          )
        } else {
          // All spikes processed, check for anomaly
          const allSpiked = layers.input.every((n) => n.spiked)
          if (allSpiked) {
            const spikeTimes = layers.input.map((n, i) =>
              n.spiked ? spikes[i] : null,
            )
            const timeDiff = Math.max(...spikeTimes) - Math.min(...spikeTimes)
            if (timeDiff > FIRING_THRESHOLD * 5) {
              // Anomaly detected - show output particles
              particlePhase = 'output'
              console.log('Anomaly detected, showing output particles')
            } else {
              // Normal pattern - reset for next cycle
              particlePhase = 'waiting'
              currentSpikeIndex = 0
              console.log('Normal pattern, resetting for next cycle')
              // Trigger final state pause after particle system completes
              finalStatePauseCounter = FINAL_STATE_PAUSE_FRAMES
            }
          }
        }
        break
      case 'output':
        // Output phase complete, reset for next cycle
        particlePhase = 'waiting'
        currentSpikeIndex = 0
        console.log('Output phase complete, resetting')
        // Trigger final state pause after particle system completes
        finalStatePauseCounter = FINAL_STATE_PAUSE_FRAMES
        break
    }
  }

  // Create particles based on current phase (only once per phase)
  if (phaseTimer === 0) {
    switch (particlePhase) {
      case 'input-to-excitatory':
        console.log(
          `Creating input-to-excitatory particles for spike ${currentSpikeIndex} from input node ${currentSpikeIndex}`,
        )
        createSpikeParticles(currentSpikeIndex)
        break
      case 'excitatory-to-inhibitory':
        console.log('Creating excitatory-to-inhibitory particles')
        createExcitatoryParticles()
        break
      case 'inhibitory-to-excitatory':
        console.log('Creating inhibitory-to-excitatory particles')
        createInhibitoryParticles()
        break
      case 'output':
        console.log('Creating output particles')
        createOutputParticles()
        break
    }
  }

  phaseTimer++
}

function updateParticles() {
  // Start particle sequence if waiting and spike time has come
  startParticleSequence()

  // Update all particles and remove dead ones
  for (let i = particles.length - 1; i >= 0; i--) {
    const isDead = particles[i].update()
    if (isDead) {
      console.log(`Particle ${i} completed journey, removing`)
      particles.splice(i, 1)
    }
  }

  // Debug particle status
  if (particles.length > 0) {
    console.log(
      `Active particles: ${particles.length}, Phase: ${particlePhase}`,
    )
    particles.forEach((p, i) => {
      console.log(
        `Particle ${i}: progress=${p.progress.toFixed(2)}, life=${p.life.toFixed(2)}`,
      )
    })
  } else if (particlePhase !== 'waiting') {
    console.log(
      `No particles left, but phase is ${particlePhase}. Checking for phase completion.`,
    )
  }

  // Manage the particle sequence
  manageParticleSequence()
}

function drawParticles() {
  // Draw all particles
  particles.forEach((particle) => particle.draw())
}

// ============================================================================
// RENDERING LOGIC (Drawing to Canvas)
// ============================================================================

function draw() {
  background(255)
  drawConnections()
  drawWeightLabels()
  drawNetwork()
  drawInfo()
  simulateSpikes()
  updateParticles()
  drawParticles()
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
    stroke(0, 150, 255, 60)
    strokeWeight(1) // Fixed width for constant excitatory-to-inhibitory weights
    line(
      layers.excitatory[i].x,
      layers.excitatory[i].y,
      layers.inhibitory[i].x,
      layers.inhibitory[i].y,
    )

    // Cross-inhibition
    stroke(255, 0, 0, 40)
    strokeWeight(1) // Fixed width for constant inhibitory weights
    for (let j = 0; j < LAYER_COUNT; j++) {
      if (i !== j) {
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

function drawWeightLabels() {
  textAlign(CENTER)
  textSize(10)
  noStroke()
  fill(0)

  // Draw weight labels for input to excitatory connections (these change with STDP)
  for (let i = 0; i < INPUT_COUNT; i++) {
    for (let j = 0; j < LAYER_COUNT; j++) {
      const weight = layers.inputToExcitatoryWeights[i][j]
      const x = (layers.input[i].x + layers.excitatory[j].x) / 2
      const y = (layers.input[i].y + layers.excitatory[j].y) / 2

      // Draw white background rectangle
      fill(255)
      rect(x - 15, y - 8, 30, 16)

      // Draw text
      fill(0)
      text(weight.toFixed(2), x, y)
    }
  }

  // Draw weight labels for excitatory to output connections (these change with STDP)
  for (let i = 0; i < LAYER_COUNT; i++) {
    const weight = layers.excitatoryToOutputWeights[i]
    // Position labels closer to the output neuron (75% of the way from excitatory to output)
    const x =
      layers.excitatory[i].x +
      (layers.output[0].x - layers.excitatory[i].x) * 0.75
    const y =
      layers.excitatory[i].y +
      (layers.output[0].y - layers.excitatory[i].y) * 0.75

    // Draw white background rectangle
    fill(255)
    rect(x - 15, y - 8, 30, 16)

    // Draw text
    fill(0)
    text(weight.toFixed(2), x, y)
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
    outputColor = isNormal ? 'white' : 'yellow'
  }

  drawLayer(layers.output, outputColor, 'Output')
}

function drawLayer(nodes, baseColor, label) {
  textAlign(CENTER)
  textSize(12)
  noStroke()
  fill(0)
  if (nodes.length > 0) text(label, nodes[0].x, 30)

  nodes.forEach((node) => {
    stroke(0)
    // Use visualSpike for input neurons, active for output, active/spiked for others
    let isActive
    let nodeColor = baseColor

    if (label === 'Input') {
      isActive = node.visualSpike
    } else if (label === 'Output') {
      isActive = node.active
      // Check if all input neurons have spiked (final state)
      const allSpiked = layers.input.every((n) => n.spiked)

      if (allSpiked) {
        // In final state: green if active (normal), yellow if inactive (anomaly)
        if (isActive) {
          nodeColor = color(0, 255, 0) // Green for normal pattern detected
          console.log('Output: Setting to GREEN (normal)')
        } else {
          nodeColor = color(255, 255, 0) // Yellow for anomaly detected
          console.log('Output: Setting to YELLOW (anomaly)')
        }
      } else {
        // Not in final state: show white
        nodeColor = 'white'
      }
      // For output neurons, always use the determined color
      fill(nodeColor)
    } else {
      // For excitatory and inhibitory neurons, only show as active if they're firing for current spike
      if (label === 'Excitatory') {
        isActive = node.active && particlePhase === 'excitatory-to-inhibitory'
      } else if (label === 'Inhibitory') {
        isActive = node.active && particlePhase === 'inhibitory-to-excitatory'
      } else {
        isActive = node.active || node.spiked
      }
      fill(isActive ? nodeColor : 'white')
    }

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
  const r = Math.floor((spikes[0] / 15) * 255) // Normalize 0-15 to 0-255
  const g = Math.floor((spikes[1] / 15) * 255) // Normalize 0-15 to 0-255
  const b = Math.floor((spikes[2] / 15) * 255) // Normalize 0-15 to 0-255

  // Draw colored background rectangle
  noStroke()
  fill(r, g, b)
  rect(15, 55, 155, 22)
  fill(0)
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
