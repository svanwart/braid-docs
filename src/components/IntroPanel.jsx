'use client'

import Link from 'next/link'

const files = [
  {
    title: 'Computer Hardware',
    size: 'How does a mix of metal, sand, and glass make a computer?',
    source:
      '/braid-docs/images/computers/computer.jpg',
    url: '/docs/computation/intro/',
  },
  {
    title: 'Biological Hardware: The Brain',
    size: 'How does the brain work?',
    source:
      '/braid-docs/images/brain/brain-card.png',
    url: '/docs/the-brain/intro/',
  },
  {
    title: 'Artificial Intelligence',
    size: '3.9 MB',
    source: 'https://picsum.photos/300/300.jpg?a=1',
    url: '/docs/ai/',
  },
  {
    title: 'Brain-Inspired Computing (Neuromorphic Computing)',
    size: '3.9 MB',
    source: 'https://picsum.photos/300/300.jpg?a=2',
    url: '/docs/neuromorphic-computing/',
  },
  {
    title: 'Cerebellum-Inspired Circuits',
    size: '3.9 MB',
    source: 'https://picsum.photos/300/300.jpg?a=3',
    url: '/docs/cerebellum-inspired-hardware/',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: 'https://pics`um.photos/300/300.jpg?a=4',
    url: '#'
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: 'https://picsum.photos/300/300.jpg?a=5',
    url: '#'
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: 'https://picsum.photos/300/300.jpg?a=6',
    url: '#'
  },
]

export function IntroPanel() {
  return (
    <div className="bg-gray-100 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {files.map((file, index) => (
            <li className="relative" key={`${file.title}-${index}`}>
              <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt=""
                  src={file.source}
                  className="pointer-events-none h-[230px] w-full object-cover object-center group-hover:opacity-75"
                />
                <Link
                  href={file.url}
                  className="focus:outline-hidden absolute inset-0"
                >
                  <span className="sr-only">View details for {file.title}</span>
                </Link>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-white">
                {index + 1}. {file.title}
              </p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500 dark:text-gray-300">
                {file.size}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
