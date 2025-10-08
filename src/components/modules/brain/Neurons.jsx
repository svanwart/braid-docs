export default function Neurons() {
  return (
    <>
      <ul className="mb-4 list-disc pl-8">
        <li className="mb-2">Spikes enter a neuron through dendrites</li>
        <li className="mb-2">Charge is then aggregated in the cell body</li>
        <li className="mb-2">
          When a threshold is reached, an electrical pulse travels down the axon
          (called an “action potential”). The charge is then passed to connected
          neurons through small gaps called synapses.
        </li>
      </ul>
    </>
  )
}
