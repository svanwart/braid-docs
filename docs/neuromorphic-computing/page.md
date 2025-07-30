---
title: Introduction to Neuromorphic Computing
layout: plain
nextjs:
  metadata:
    title: Introduction to Neuromorphic Computing
    description: TBD.
---

## What is neuromorphic computing?
Neuromorphic computing is a method of designing computer hardware and software that takes inspiration from the structure and function of the brain. Instead of processing information in the traditional way – where memory and computation are separated and everything runs on a constant clock – neuromorphic systems are built more like networks of brain cells (neurons). Specifically, neuromorphic computers:

* Process information only when needed (this is called event-driven computing),
* Store and process data in the same place, like how neurons both store and transmit signals, and
* Communicate using brief electrical pulses (or “spikes”), similar to how real brain cells communicate.

Because of these features, neuromorphic computers can perform certain tasks – like recognizing patterns, reacting to changes, or learning from small amounts of data – with much greater efficiency and speed than “traditional” computers, while using less energy.

## Why is there interest in neuromorphic computing?
The human brain still outperforms artificial intelligence in many everyday tasks – like recognizing faces, understanding speech, or making decisions with limited or messy information. The brain is able to learn from just a few examples, adapt quickly to new situations, and operate on very little power (about 20 watts, which is less than a light bulb). In contrast, most modern AI systems require huge amounts of labeled data and energy-hungry hardware; and often struggle with uncertainty, context, and learning on the fly. By taking inspiration from the brain’s structure and behavior to design systems that are more flexible, adaptive, and efficient, neuromorphic computing aims to improve how machines learn and reason, while also reducing their energy and data demands.

## How is the structure of the brain different from a “traditional” computer?
Traditional computers are typically based on the Von Neumann architecture, which is comprised of:

* A central processing unit (CPU) – for processing instructions and performing calculations,
* Memory (or RAM) – for storing data and instructions), and 
* Peripheral input and output devices – for sending and receiving external information (e.g., keyboard, mouse, speakers, microphone, etc.). 

Because a computer’s memory (where data is stored) is separate from where instructions are processed, information must travel back and forth through a shared communication channel called the “bus.” This back-and-forth creates a bottleneck, which slows things down and consumes a lot of energy, especially for complex tasks like learning from or recognizing patterns in data.

### [Diagram]

In contrast, the brain doesn't separate memory and processing. Instead, it combines them in the same place: neurons both store and process information, and they do so in parallel. Signals travel between neurons along connections called synapses, which adapt and strengthen based on experience. This is how the brain learns. Although there are roughly 86 billion neurons and hundreds of trillions of synapses – all operating at the same time – communication across these neurons uses a very small amount of power (cite).


### [Diagram]

These key differences – separation vs. integration, sequential vs. parallel – is one reason why the brain can handle real-world situations so efficiently, and why neuromorphic computing tries to mimic it.


## How, exactly, does neuromorphic computing “take inspiration” from the brain?
When people say neuromorphic computing “takes inspiration” from the brain, they mean that its design – both in hardware and algorithms – mimics certain principles of brain function, rather than replicating the brain exactly.

### Hardware Innovations
The computer chips used in neuromorphic systems rely on fundamentally different building blocks than those in traditional von Neumann computers. Instead of separating memory and processing, neuromorphic devices use innovations like memristors and synaptic transistors (pictured below), which co-locate memory and computation, similar to how biological neurons operate.

In neuromorphic systems, the resistance values of the building blocks represent the weights of a neural network, and the connections between these blocks represent the edges of the network. These resistance values can be dynamically adjusted by voltage pulses (or spikes) during the learning process, allowing the system to adapt over time, just like a brain.

### Software / Algorithm Innovations
Neuromorphic systems also use different kinds of software and learning methods compared to traditional computers. Instead of running programs step-by-step, training on huge datasets, and continuously using energy to maintain their state, neuromorphic systems only process information when something changes – like how a neuron "fires" when it receives a strong enough signal.

Many neuromorphic systems use spiking neural networks, where information is sent as quick electrical pulses, or spikes, rather than steady numbers. These systems can learn over time using brain-inspired rules, such as “fire together, wire together,” meaning connections get stronger when two neurons are active at the same time. This allows them to learn continuously, react quickly, and use much less power, making them ideal for real-world tasks like recognizing sounds, detecting movement, or controlling robots.

### [Diagram]

## How do neuromorphic computers compute differently from “traditional” ones?

> **Analogy:** Library vs. Study Group

### Deep Neural Networks (DNNs) are like a library:
In a library, all the books (which represent memory) are stored on shelves far away from where you actually do your reading or studying (the processing). Every time you need to learn something or answer a question, you have to walk back and forth to the shelves to find the right books. You end up pulling out all the books you think you might need and reading through them completely – even if some aren’t very useful for the question at hand. After studying, you spend a lot of time reviewing all your notes carefully to make sure you really understand everything (like the backpropagation step in DNN training, where the network adjusts itself by reviewing all the calculations). This process is time-consuming and energy-intensive because you’re moving a lot of information back and forth and reprocessing everything, regardless of what’s immediately needed.

### Spiking Neural Networks (SNNs) are like a study group:
In a study group, everyone keeps the books (memory) right on their desks, right next to where they’re actively thinking and discussing (processing). When a question comes up, group members only open the specific books they need, and only when it’s relevant (this is the event-driven part). Instead of reviewing every book after every question, the group talks and adjusts their understanding immediately, learning as they go without going back over everything from scratch. This means they spend less time and energy, reacting quickly and efficiently only when new information arrives.


Imagine that you’re taking an art history course and your teacher asks the class about a particular artist from the early 20th century. If your teacher were a Von Neumann computer, they would ask every student, one by one: Are you here? Do you have the answer? What’s your name again? Even if only one student actually knows the answer, the teacher still has to go through every student, every time. This happens because in a von Neumann computer:

* The memory (where data is stored) and the processor (that does the work) are in separate places.
* Every time the computer needs to do something, it has to go back and forth to ask for data, then do something with it.
* It follows a fixed schedule, like calling on every student in order, even if nothing changes.
This is slow and energy-hungry, especially when most of the “students” (data or neurons) have nothing to add.

On the other hand, a neuromorphic system is like a teacher who says: “only raise your hand if you have something to say.” In this model:

* The teacher doesn’t waste time calling on every student.
* Students (neurons) only speak up (spike) when something important happens.
* The system reacts only to changes, which makes things faster and more efficient.

In neuromorphic chips:
* Memory and processing are often in the same place, like a student who remembers their notes and thinks through the answer at the same desk.
* Only active neurons and synapses participate, like students who raise their hands when needed.




