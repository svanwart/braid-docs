export const audienceItems = {
  generalPublic: {
    tabTitle: 'General Public',
    title: 'For the General Public',
    description: (
      <>
        <strong>Goal</strong>: The public needs clear, accessible explanations
        of what the technology is, how it might appear in everyday life, and
        what its benefits and risks are. This helps people make informed
        decisions, voice concerns, and engage meaningfully in public
        conversations about emerging technologies.
      </>
    ),
    pages: [
      {
        title: 'Plain-language summary',
        description: 'What the tech is and why it matters in everyday life',
        color: 'bg-purple-100',
      },
      {
        title: 'Explainer video or animation',
        description: '1-minute overview of how brain-like chips work',
        color: 'bg-indigo-100',
      },
      {
        title: 'Real-world examples',
        description: 'Smart hearing aids, wildfire sensors, adaptive drones',
        color: 'bg-blue-50',
      },
      {
        title: 'Benefits and risks',
        description:
          'Faster, smarter machines vs. concerns like bias or surveillance',
        color: 'bg-teal-50',
      },
    ],
  },
  policymakers: {
    tabTitle: 'Policymakers',
    title: 'For Policymakers',
    description: (
      <>
        <strong>Goal</strong>: Policymakers need insight into how the technology
        works, where it&apos;s being applied, and what ethical, legal, and
        societal implications it raises. This information supports
        evidence-based regulation, risk assessment, and the creation of
        frameworks that protect public interests while enabling innovation.
      </>
    ),
    pages: [
      {
        title: 'Executive summary',
        description: `What the tech is, where it's used, and why it matters`,
        color: 'bg-blue-100',
      },
      {
        title: 'Policy-relevant applications',
        description:
          'Smart infrastructure, defense systems, assistive health tech',
        color: 'bg-teal-50',
      },
      {
        title: 'Ethics and governance',
        description: 'Regulation, accountability, export control, transparency',
        color: 'bg-pink-100',
      },
      {
        title: 'Policy recommendations',
        description: 'R&D funding, oversight frameworks, public engagement',
        color: 'bg-indigo-50',
      },
    ],
  },
  engineeringStudents: {
    tabTitle: 'Students',
    title: 'For Students',
    description: (
      <>
        <strong>Goal</strong>:Engineering students benefit from understanding
        the principles behind the technology, how it differs from traditional
        systems, and how to design with ethical and societal impacts in mind.
        This equips them to build responsible systems that are both technically
        robust and socially aware.
      </>
    ),
    pages: [
      {
        title: 'Concept explainers',
        description:
          'Memtransistor vs. CMOS, SNNs vs. DNNs, unsupervised learning',
        color: 'bg-pink-100',
      },
      {
        title: 'Comparison matrix',
        description:
          'Comparing the biological learning, learning with "traditional" hardware, and learning with "brain-like" hardware',
        color: 'bg-indigo-100',
      },
      {
        title: 'Interactive demos',
        description:
          'Code walkthroughs or applets showing spike behavior and learning',
        color: 'bg-blue-50',
      },
      {
        title: 'Career and research connections',
        description: 'Applications in AI, neuroscience, robotics, and policy',
        color: 'bg-purple-50',
      },
      {
        title: 'Ethics in practice',
        description: 'Discussion prompts and case studies on responsible AI',
        color: 'bg-yellow-50',
      },
    ],
  },
  researchers: {
    tabTitle: 'Researchers',
    title: 'For Researchers',
    description: (
      <>
        <strong>Goal</strong>: Researchers need a deep understanding of the
        system&apos;s architecture, capabilities, and theoretical underpinnings,
        along with its broader implications across disciplines. This allows them
        to explore open questions, identify real-world challenges, and
        contribute to both scientific progress and responsible innovation.
      </>
    ),
    pages: [
      {
        title: 'Technical overviews',
        description:
          'Architecture, encoding methods, plasticity models, energy benchmarks',
        color: 'bg-indigo-100',
      },
      {
        title: 'Key papers and datasets',
        description: 'Curated research links, datasets, and open repositories',
        color: 'bg-pink-100',
      },
    ],
  },
}
