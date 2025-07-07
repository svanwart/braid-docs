---
title: Unsupervised Spiking Neural Networks
nextjs:
  metadata:
    title: Unsupervised Spiking Neural Networks
    description: TBD.
---


NIKKO WIP RESOURCES

https://na.uni-tuebingen.de/ex/ml_seminar_ss2022/Unsupervised_Learning%20Final.pdf

https://www.ibm.com/think/topics/supervised-learning


## Taken from ChatGPT (needs verification)

In addition to supervised learning, it is also  possible to do unsupervised classification on the MNIST digits using spiking neural networks (SNNs) with spike-based input and STDP learning. This has been demonstrated in both academic papers and frameworks like Lava, BindsNET, and Norse.

### Approach
* **Input**: Each MNIST image (28×28 pixels) is converted into a spike train (often using Poisson encoding).
* **Network**: A small SNN (often 784 input neurons → ~100 output neurons) connected via plastic synapses trained via STDP.
* **Goal**: Let neurons self-organize — each one becomes a detector for a specific digit over time.
* **Post-hoc Labeling**: After training, assign each neuron to the digit it fires for most often.

### Efficiency
* Accuracy is ~85–92% (after label assignment) on MNIST with 100–400 neurons
* All unsupervised!
* Far from modern deep nets, but biologically plausible and efficient
* STDP (spike-timing-dependent plasticity) causes neurons that fire shortly after an input pattern to strengthen their synapses. Over time, each neuron becomes tuned to a specific digit (e.g. neuron 34 fires for 9s).

### Some Subtleties
When you're training the network, **the algorithm does not know in advance how many classes there are**. Patterns are just learned and classified according to the number of output nodes you arbitrarily designate before training. Unlike DNN:

* No gradient descent
* No loss function
* No label-based feedback

After training is complete, there's an additional step where the classes are imposed on top of the output nodes, where the N (arbitrary) output nodes are organized into the 10 known classes the digits 0-9).

## Key Differences Between STDP (in SNNs) and K-Means

| Feature                      | STDP / Spiking Neural Network                            | k-Means Clustering                                  |
|-----------------------------|-----------------------------------------------------------|-----------------------------------------------------|
| **Learning Mechanism**      | Local synaptic updates based on timing of spikes         | Global optimization of cluster centroids           |
| **Data Representation**     | Temporal, event-based spikes                              | Static vectors                                      |
| **Topology**                | Layered neural network (e.g., input → excitatory neurons) | Flat clustering (no hierarchy or layers)            |
| **Update Type**             | Hebbian (correlation-based) learning                      | Assignment → centroid update                        |
| **Supervision**             | Unsupervised (labels used only post hoc)                  | Unsupervised (labels used only post hoc)            |
| **Class Awareness**         | Doesn’t know number of classes, neurons may specialize    | Requires a fixed number of clusters `k`             |
| **Biological Plausibility** | High – mimics real neurons                                | Low – purely mathematical model                     |
| **Incremental / Online**    | Naturally online and adaptive                             | Usually batch-based (though online versions exist)  |

* K-means is abstract and mathematical — useful for quick clustering, but biologically implausible.
* STDP models how real neurons in the brain adapt based on activity, timing, and local rules — it’s part of the foundation of neuromorphic computing.

## Which to use: DNNs versus Unsupervised STDP Networks
* Unsupervised STDP models shine in low-power, real-time, and biologically-inspired applications (like edge devices or robotics), while DNNs dominate in accuracy-driven, large-scale, and cloud-based tasks.
* STDP Networks work well fog "online" learning (e.g., how a system learns from data that arrives continuously or in real time, rather than in fixed batches).

## Other non-SNN algos that can identify new classes over time

| Approach                    | Learns New Classes Over Time? | Supervised/Unsupervised | Key Mechanism                                |
|-----------------------------|-------------------------------|-------------------------|----------------------------------------------|
| Regularized DNNs (EWC, etc.) | Yes (with constraints)         | Supervised              | Weight constraints to prevent forgetting     |
| Replay-based DNNs            | Yes                           | Supervised              | Rehearsal of old data                         |
| Online Clustering            | Yes                           | Unsupervised            | Adaptive centroid update, new cluster creation|
| Prototype/Mem. Methods       | Yes                           | Supervised/Meta-Learning| Prototype vectors for classes                 |
| Bayesian Nonparametrics      | Yes                           | Unsupervised            | Nonparametric clustering, grows classes      |
| Progressive / Growing Nets   | Yes                           | Supervised              | Dynamic architecture expansion                |

## Relevant Papers
### Recommended Papers on STDP Extensions & Continual Learning

1. **"Continual Learning in Spiking Neural Networks with Homeostatic Plasticity"**  
   *Authors:* Bellec et al. (2018)  
   *Summary:* Introduces mechanisms combining STDP with homeostatic plasticity to stabilize learned patterns and reduce forgetting, enabling continual learning in SNNs.  
   [Link (Open Access)](https://arxiv.org/abs/1803.04717)

2. **"Unsupervised Learning of Digit Recognition Using Spike-Timing-Dependent Plasticity"**  
   *Authors:* Diehl & Cook (2015)  
   *Summary:* Demonstrates STDP-based unsupervised learning of MNIST digits and discusses how networks self-organize to represent categories, touching on adaptability.  
   [Link](https://www.frontiersin.org/journals/computational-neuroscience/articles/10.3389/fncom.2015.00099/full)

3. **"Spike-based Bayesian-Hebbian Learning of Neural Representations"**  
   *Authors:* Tully et al. (2016)  
   *Summary:* Combines STDP with Bayesian inference principles, showing how networks can learn representations in a probabilistic framework, enabling adaptive category learning.  
   [Link](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004954)


4. **A survey and perspective on neuromorphic continual learning systems**  
   *Authors:* Mishra Richa, Suri Manan (2023)
   *Journal*: Frontiers in Neuroscience
   [Link](https://doi.org/10.3389/fnins.2023.1149410)

   *Summary*: This paper provides the first comprehensive review of neuromorphic continual learning (NCL)—a field that combines low-power neuromorphic computing with the need for systems that can adapt to new data without forgetting past learning. These systems are inspired by biological neural networks and are increasingly relevant in sectors like healthcare and transport that demand intelligent, autonomous, and energy-efficient solutions.

    The authors:
    * Summarize recent advances in NCL across applications, algorithms, architectures, and hardware.
    * Highlight the gap between research and real-world deployment.
    * Analyze biological principles that enhance learning.
    * Assess current hardware capabilities and limitations, especially regarding Nano-Device-based architectures.
    * Propose improved evaluation metrics for NCL systems.
    * Outline a roadmap and challenges for developing real-world, application-specific NCL solutions.
