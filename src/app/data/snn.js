import Image from 'next/image'

export const snnSections = [
  {
    tabTitle: 'Overview',
    title: 'General Introduction',
    description: (
      <>
        <strong>Goal</strong>: A clear, accessible explanations of technology
        is, how it works (at a very high level), and some of its applications.
        {/* Slide 1 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            1. What is a Spiking Neural Network?
          </h2>
          <p>
            <em>TODO: Simple Explanation:</em> A spiking neural network (SNN) is
            a type of artificial neural network that more closely mimics the way
            biological brains work than traditional neural networks.
          </p>
        </section>
        {/* Slide 2 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            2. How are they similar and different from traditional neural
            networks?
          </h2>
          <p>
            <em>TODO: Simple Explanation:</em> Talk about the archiecture with
            diagrams.
          </p>
        </section>
        {/* Slide 3 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            3. Why should I care about SNNs?
          </h2>
          <p className="mb-4">
            <em>TODO: Explanation of benefits:</em>
          </p>
          <ol className="list-decimal pl-8">
            <li className="mb-4">
              <strong>Energy Efficiency:</strong> SNNs can do complex tasks
              using much less power than conventional AI. This matters for:
              <ul className="list-disc pl-8">
                <li className="mt-4">Meeting climate goals</li>
                <li className="mb-4">
                  Edge computing (e.g. phones, drones, wearables)
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <strong>New Capabilities</strong>: They are better suited to tasks
              that involve real-time sensing and response, like:
              <ul className="list-disc pl-8">
                <li className="mt-4">
                  Autonomous vehicles avoiding sudden obstacles
                </li>
                <li>Hearing aids that adapt to your environment</li>
                <li className="mb-4">
                  Early warning systems in infrastructure
                </li>
              </ul>
            </li>
          </ol>
        </section>
      </>
    ),
  },
  {
    tabTitle: 'Technical Explainers',
    title: 'How Do Spiking Neural Networks Work?',
    description: (
      <>
        <strong>Goal</strong>: Provides a more in-depth explanation of the the
        principles behind the technology, how it differs from other techniques /
        approaches.
        {/* Slide 1 */}
        <section className="slide">
          <h2 className="text-lg font-semibold">1. Neurons</h2>
          <p className="mb-4">
            Define the basic concepts that are needed to understand a SNN
            artificialneuron, including:
          </p>
          <ul className="mb-4 list-disc pl-8">
            <li>Membrane potential</li>
            <li>Ingoing edges + weights</li>
            <li>Outgoing edges + weights</li>
            <li>Threshold potential</li>
            <li>Spikes</li>
            <li>Refractory period</li>
            <li>Voltage decay</li>
          </ul>
          <p>
            Also create some interactive elements to show what each of these
            concepts means.
          </p>
        </section>
        {/* Slide 2 */}
        <section className="slide">
          <h2 className="text-lg font-semibold">
            2. Spike Timing Dependent Plasticity
          </h2>
          <p className="mb-4">Define the basic concepts around STDP:</p>
          <ul className="mb-4 list-disc pl-8">
            <li>Weights</li>
            <li>LTP (Long-term potentiation)</li>
            <li>LTD (Long-term depression)</li>
          </ul>
          <p>
            Also create some interactive elements to show what each of these
            concepts means.
          </p>
        </section>
        {/* Slide 3 */}
        <section className="slide">
          <h2 className="text-lg font-semibold">3. SNN Architecture</h2>
          <p>Explain the architecture of a SNN, including:</p>
          <ul className="mb-4 list-disc pl-8">
            <li>Encoding Inputs as Spike Trains</li>
            <li>Layers</li>
            <li>Neurons</li>
            <li>Edges</li>
            <li>Weights</li>
          </ul>
        </section>
        {/* Slide 4 */}
        <section className="slide">
          <h2 className="text-lg font-semibold">4. Interactive Examples</h2>
          <p>Different ways that SNNs can be used:</p>
          <h3 className="text-lg font-semibold">Colors</h3>
          <ul className="mb-4 list-disc pl-8">
            <li>Classification: What type of color is this?</li>
            <li>Anomaly detection: outlier colors</li>
          </ul>
          <img
            className="mb-8 w-full rounded border border-gray-200"
            src="/braid-docs/images/neuromorphic/snn.png"
            alt="SNN Architecture"
          />
          <h3 className="text-lg font-semibold">
            ECG: Detecting heart conditions
          </h3>
          <p className="mb-8">
            TODO: Explain the idea of using ECG to detect heart conditions.
          </p>
          <h3 className="text-lg font-semibold">Clap v. Snap</h3>
          <p>
            TODO: Explain the idea of using Clap v.s. snap to detect heart
            conditions.
          </p>
        </section>
        {/* Slide 5 */}
        <section className="slide">
          <h2 className="text-lg font-semibold">5. Accuracy</h2>
          <p>Understanding potential pitfalls:</p>
          <ul className="mb-4 list-disc pl-8">
            <li>False positives</li>
            <li>False negatives</li>
            <li>Model drift</li>
            <li>Data requirements</li>
            <li>Interpretability</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    tabTitle: 'Applications & Use Cases',
    title: 'Applications & Use Cases',
    description: (
      <>
        <p className="mb-4">
          <strong>Goal</strong>: How the technology is being used in the real
          world, how it might be used in the future, and an assessment of
          benefits and risks.
        </p>
        <section className="slide">
          <h2 className="text-lg font-semibold">Current Applications</h2>
          <p className="mb-4">
            <em>Elaborate on some subset of the most relevant applications:</em>
          </p>
          <ol className="mb-4 list-decimal pl-8">
            <li className="mb-4">
              <strong>Energy-efficient AI for edge devices</strong> - Powers
              phones, wearables, and drones with low energy use.
            </li>
            <li className="mb-4">
              <strong>Biosignal processing</strong> - Analyzes brain, heart, and
              muscle signals (like EEG, ECG, EMG) for real-time health
              monitoring and diagnosis.
            </li>
            <li className="mb-4">
              <strong>Event-based vision and perception</strong> - Enables smart
              cameras and sensors to detect motion, gestures, or obstacles in
              real time.
            </li>
            <li className="mb-4">
              <strong>Speech and audio recognition</strong> - Identifies sounds
              or keywords using minimal power, useful for always-on voice
              assistants.
            </li>
            <li className="mb-4">
              <strong>Real-time decision-making in robotics</strong> - Allows
              autonomous systems (robots, vehicles) to react quickly to changing
              environments.
            </li>
            <li className="mb-4">
              <strong>Anomaly and pattern detection</strong> - Finds unusual
              signals in health data, cybersecurity, or industrial monitoring.
            </li>
            <li className="mb-4">
              <strong>Smart sensing in IoT and environments</strong> - Powers
              responsive, low-power sensors for buildings, ecosystems, and
              disaster detection.
            </li>
          </ol>
        </section>
      </>
    ),
  },
]
