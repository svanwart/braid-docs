---
title: "Introduction to Computer Hardware: The Von Neumann Architecture"
nextjs:
  metadata:
    title: "Introduction to Computer Hardware: The Von Neumann Architecture"
    description: TBD.
---
## 1. Introduction
Von Neumann Architecture is a physical computer model consists of a central processing unit (CPU), a memory unit, and a source of input and output (I/O). Von Neumann computers are ubiquitous throughout the world. Computers that are designed using Von Neumann Architecture include: 
- The supercomputer IBM Blue Gene <https://en.wikipedia.org/wiki/IBM_Blue_Gene#Design>
- Graphics cards (such as those produced by NVIDIA) <https://en.wikipedia.org/wiki/Graphics_processing_unit>
- The device you are using to view this website <https://en.wikipedia.org/wiki/Smartphone#Central_processing_unit>
---

## 2. Structure
The Von Neumann model processes data using one given instruction at a time. The CPU processes data following instructions while the memory unit stores both data and instructions. The Von Neumann model is cost effective and widely used but a flaw exists in the model: The Von Neumann Bottleneck.

There is only one main bus for data to go between the CPU and the memory unit of the model. This limitation is the performance bottleneck in the development of faster computers. While CPUs have been improving at an incredible rate, the main bus has lagged behind. To bypass this, many slower CPUs are run in parallel to process large amounts of data simulatneously. However, in the era of machine learning and big data, the issues of power consumption and productivity demand solutions.
---

## 3. Relation to Machine Learning
A large number of Von Neumann computers are needed in parallel to process training data. Graphical Processing Units (GPUs) such as those produces by Nvidia and AMD are specially designed units for parallel processing making them valuable for machine learning. Multi-million (or even billion) dollar supercomputers are essentially tens of hundreds of computers run in parallel.

New physical computer chips in the form of neuromorphic architecture seek to improve in both efficiency and speed by replicating the neurons of the brain instead of improving on the Von Neumann architecture. See the "neuromorphic computing" and "cerebellum inspired hardware" for insights into how the brain and neuromorphic computing operates diffeently from the common computer.
---

## More Information
* Von Neumann Architecture explained in further detail: <https://parikshapatr.com/solutions/von-neumann-architecture-explained-in-detail>
* Brief video explaining the CPU, memory: <https://www.youtube.com/watch?v=SbqXqQ-2ixs>
---

<!-- 
These were my sources (More Information) - Nikko
-->


