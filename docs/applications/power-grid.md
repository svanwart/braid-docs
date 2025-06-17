---
title: "Smart Power Grids: Anomaly Detection Without a Brain"
nextjs:
  metadata:
    title: "Smart Power Grids: Anomaly Detection Without a Brain"
    description: TBD.
layout: plain
---

## Scenario
A rural electrical substation is retrofitted with a neuromorphic chip. The substation is not connected to the cloud. It doesn’t run Python scripts or need labeled data. Instead, voltage signals (thousands per second) are filtered through a brain-inspired circuit made from [memtransistors](#) -- tiny components that can both compute and remember.

The chip is first calibrated by listening and measure the regular ebb and flow of electricity. Over time, the chip learns what “normal” electrical activity looks like, without the need for labeled training data or a complex AI model that could be potentially expensive to train. 

For weeks after its initial calibration, the chip sees nothing unusual: just the rhythm of power usage: the morning spike when farms boot up irrigation, a lull at noon, the flicker of lights at dusk.

But one morning, the signal pattern shifts. A ripple in the voltage—subtle, fast, and invisible to traditional systems—appears in the signal. The chip notes this unusual signal.
It doesn’t know why it’s wrong. It doesn’t label it. It doesn’t explain what is different. It just spikes, which alerts a the human operator that something is off. Moments later, a transformer unit fails.

## How did it work?
This chip didn’t need a dataset of past failures. It wasn’t programmed with if-then rules. It learned without being directly taught -- using an "unsupervised learning" algorithm. In other words, it learned simply by observing the flow of everyday electricity, building its own internal sense of “normal” based on everyday patterns. In this way, it was able to noticed unusual patterns.

**What makes this possible is a new kind of hardware:** neuromorphic circuits that mimic the brain’s ability to process signals in real time, using little energy. At the heart of this chip are [memtransistors](#), which can adapt their behavior based on input history—like a neuron forming a memory.

These chips can sit in remote locations, detecting anomalies in power grids, pipelines, even spacecraft. They don’t need cloud access. They don’t need retraining. They just need data—and time.

{% callout title="Learn More" %}

More detailed info here:
* [How did it work?](#) → Link to an explainer on memtransistors + unsupervised learning
* [Why is this different from AI in the cloud?](#) → DNN vs. SNN
* [What are the policy implications?](#) → Security, reliability, transparency
* [See the circuit](#) → Interactive simulation or image of the chip layout

{% /callout %}

## Related work

* [Anomaly detection based on LSTM and autoencoders using federated learning in smart electric grid](https://www.sciencedirect.com/science/article/pii/S0743731524001151)