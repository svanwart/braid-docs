'use client'
import React from 'react'
const navigation = [
  {
    title: 'Overview of This Website',
    id: 1,
    status: 'TODO',
    color: 'bg-indigo-100',
    description:
      'An overview of the research project, including a discussion of the underlying motivations, an explanation of the technologies explored, and a discussion of potential applications and impacts.',
    links: [
      {
        title: 'What is this?',
        href: '/overview',
        level: [1, 2, 3],
      },
    ],
  },
  {
    title: 'Biological Intelligence Primer',
    id: 2,
    status: 'TODO',
    color: 'bg-indigo-100',
    description:
      'What makes biological intelligence so efficient and adaptable. Provides an overview of how the brain processes information through neurons and synapses.',
    links: [
      {
        title: 'Brainstorm',
        href: '/docs/notes',
        level: [1, 2, 3],
      },
    ],
  },
  {
    title: 'Artificial Intelligence Primer',
    id: 3,
    status: 'TODO',
    color: 'bg-indigo-100',
    description:
      'An overview of the AI/ML landscape. Aimed to help learners appreciate how current AI systems differ from biological intelligence in both capabilities and limitations.',
    links: [
      { title: 'Von Neumann', href: '/docs/computation', level: [1] },
      {
        title: 'How do circuits work?',
        href: '/docs/computation/circuits',
        level: [1],
      },
      {
        title: 'Digital and Analog Signals (I/O)',
        href: '/docs/computation/signals',
        level: [1, 2],
      },
      {
        title: 'Binary Numbers',
        href: '/docs/computation/binary',
        level: [1, 2],
      },
      {
        title: 'Example: How do circuits do math?',
        href: '/docs/computation/circuits-math',
        level: [1, 2, 3],
      },
    ],
  },
  {
    title: 'Neuromorphic Computing',
    id: 4,
    status: 'In Progress',
    color: 'bg-teal-50',
    description:
      'An overview of traditional and neuromorphic computing hardware, including the von Neumann bottleneck, memristors, and neuromorphic chips.',
    links: [
      {
        title: 'Introduction to Neuromorphic Computing',
        href: '/docs/neuromorphic-computing',
        level: [1, 2, 3],
      },
    ],
  },
  {
    title: 'Brain-Inspired Spiking Neural Networks',
    description:
      'Explanations and demos of spiking neural networks: how they process information and learn through spike timing (vis-a-vis traditional neural networks and biological learning).',
    id: 5,
    status: 'In Progress',
    color: 'bg-teal-50',
    links: [
      {
        title: 'Intro to Artificial Intelligence (AI)',
        href: '/docs/ai',
        level: [1, 2],
      },
      {
        title: 'Neural Networks',
        href: '/docs/ai/neural-networks',
        level: [1, 2],
      },
      {
        title: 'Unsupervised Spiking Neural Networks',
        href: '/docs/ai/snn-unsupervised',
        level: [1, 2, 3],
      },
    ],
  },
  {
    title: 'Cerebellum-Inspired Circuits',
    description:
      "An overview of the cerebellum's architecture for motor control and learning, how it has inspired this research, and potential applications.",
    id: 6,
    status: 'TODO',
    color: 'bg-indigo-100',
    links: [
      {
        title: 'Introduction to Cerebellum-Inspired Hardware',
        href: '/docs/cerebellum-inspired-hardware',
        level: [1, 2, 3],
      },
    ],
  },
  {
    title: 'Broader Impacts & Case Studies',
    description:
      'Examine the broader impacts of the research project, including potential applications, benefits, and risks.',
    id: 7,
    status: 'TODO',
    color: 'bg-indigo-100',
    links: [
      { title: 'Applications', href: '/docs/applications', level: [1, 2] },
      {
        title: 'Smart Power Grids',
        href: '/docs/applications/power-grid',
        level: [1, 2, 3],
      },
      {
        title: 'Personalized Hearing Aids',
        href: '/docs/applications/hearing-aids',
        level: [1, 2, 3],
      },
      {
        title: 'Warehouse Robotics',
        href: '/docs/applications/robotics',
        level: [1, 2, 3],
      },
      {
        title: 'Risk Frameworks',
        href: '/docs/broader-impacts',
        level: [1, 2],
      },
      {
        title: 'ELSI Methods',
        href: '/docs/broader-impacts/methods',
        level: [1, 2],
      },
      {
        title: 'Efficiency',
        href: '/docs/broader-impacts/efficiency',
        level: [1, 2, 3],
      },
      {
        title: 'Surveillance',
        href: '/docs/broader-impacts/surveillance',
        level: [1, 2, 3],
      },
      {
        title: 'Alina: Bias in AI',
        href: '/docs/case-studies/alina',
        level: [1, 2],
      },
      {
        title: 'Tess: The Environment',
        href: '/docs/case-studies/tess',
        level: [1, 2],
      },
    ],
  },
]

function getChapter(chapterId) {
  return navigation.find((section) => section.id === chapterId)
}

function getChapterByHref(href) {
  return navigation.find((section) =>
    section.links.some((link) => link.href === href),
  )
}

function getLinksByLevel(chapter, level) {
  return chapter.links.filter(
    (link) => level === 0 || link.level.includes(level),
  )
}

export { navigation, getChapter, getLinksByLevel, getChapterByHref }
