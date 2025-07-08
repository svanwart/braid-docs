export const hardwareSections = [
  {
    tabTitle: 'Overview',
    title: 'Overview: Traditional vs. Neuromorphic Hardware',
    description: (
      <>
        <p className="mb-4 text-lg">
          <strong>Goal</strong>: Provide a high-level explanation of how
          traditional computer hardware works, the limitations of the von
          Neumann architecture, and how neuromorphic hardware (like memristors)
          aims to address these challenges.
        </p>
        {/* Slide 1 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            1. Description of Von Neumann Architecture + Definitions
          </h2>
          <p>
            Describe basic components of a von Neumann architecture and building
            blocks:
          </p>
          <ul className="mt-4 list-disc pl-8">
            <li>Processor</li>
            <li>Memory</li>
            <li>Input/Output</li>
            <li>Maybe transistors, resistors, and logic gates?</li>
            <li>CPUs v. GPUs</li>
          </ul>
        </section>
        {/* Slide 2 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            2. The Von Neumann Bottleneck
          </h2>
          <p>
            The von Neumann architecture separates memory and processing units,
            requiring data to move back and forth between them. This creates a
            bottleneck that limits speed and energy efficiency, especially for
            data-intensive tasks like AI and machine learning.
          </p>
        </section>
        {/* Slide 3 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            3. Enter Memristors and Neuromorphic Hardware
          </h2>
          <p>
            Memristors are novel devices that can both store and process
            information, inspired by the way synapses work in the brain.
            Neuromorphic hardware uses memristors and other brain-inspired
            components to perform computation and memory in the same place,
            potentially overcoming the von Neumann bottleneck and enabling much
            greater energy efficiency.
          </p>
        </section>
      </>
    ),
  },
  {
    tabTitle: 'Technical Explainers',
    title: 'Taking a Deeper Dive into Neuromorphic Materials',
    description: (
      <>
        <p className="mb-4 text-lg">
          <strong>Goal</strong>: Dive deeper into the physics and engineering of
          transistors, resistors, and memristors, and explain how neuromorphic
          hardware is built from these components.
        </p>
        {/* Slide 1 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            1. Transistors: The Workhorses of Modern Computing
          </h2>
          <p>
            Transistors are semiconductor devices that can switch or amplify
            electrical signals. They are used to build logic gates, memory
            cells, and processors. The most common type is the MOSFET
            (Metal-Oxide-Semiconductor Field-Effect Transistor).
          </p>
          <p className="mt-4">Possible interactive demos / elements:</p>
          <ul className="mt-4 list-disc pl-8">
            <li>Demo of a transistor working as a switch</li>
            <li>Demo of some logic gates (made up of transistors)</li>
            <li>Demo of using logic gates to add numbers (half adder chain)</li>
          </ul>
        </section>
        {/* Slide 2 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            2. Resistors: Controlling Current
          </h2>
          <p>
            Resistors are passive components that limit the flow of electric
            current. They are used for voltage division, biasing, and protecting
            circuits from excessive current.
          </p>
        </section>
        {/* Slide 3 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            3. Memristors: Memory + Resistor
          </h2>
          <p>
            Memristors are two-terminal devices whose resistance can be changed
            and remembered based on the history of voltage and current. They can
            mimic synaptic plasticity in the brain, making them ideal for
            neuromorphic systems.
          </p>
          <ul className="mt-4 list-disc pl-8">
            <li>
              <em>TODO:</em> Demo of a memristor working
            </li>
          </ul>
        </section>
        {/* Slide 4 */}
        <section className="slide">
          <h2 className="mb-4 text-lg font-semibold">
            4. Neuromorphic Hardware: Putting It All Together
          </h2>
          <p>
            Neuromorphic hardware integrates memristors, transistors, and other
            components to create circuits that process and store information in
            a brain-like way. This enables highly parallel, energy-efficient
            computation for AI and sensory processing tasks.
          </p>
          <ul className="mt-4 list-disc pl-8">
            <li>
              <em>TODO:</em> diagram / demo of a neuromorphic circuit
            </li>
          </ul>
        </section>
      </>
    ),
  },
]
