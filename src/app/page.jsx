'use client'
import Link from 'next/link'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Logo, Logomark } from '@/components/Logo'
import { ThemeSelector } from '@/components/ThemeSelector'

const chapters = [
  {
    title: 'Executive Summary',
    description:
      'Gives an overview of the research project, including a discussion of the underlying motivations, an explanation of the technologies explored, and a discussion of potential applications and impacts.',
    url: '#',
    status: 'TODO',
    color: 'bg-yellow-50',
  },
  {
    title: '1. Broader Impacts',
    description:
      'Takes a deeper dive into the broader impacts of the research project, including potential applications, benefits, and risks.',
    source: 'https://picsum.photos/300/300.jpg?a=6',
    url: '#',
    status: 'TODO',
    color: 'bg-indigo-100',
  },
  {
    title: '2. Innovations in Computer Hardware',
    description: 'Provides a background on ',
    source: '/braid-docs/images/computers/computer.jpg',
    url: '#',
    status: 'In Progress',
    color: 'bg-teal-50',
  },
  {
    title: '3. Artificial Intelligence Primer',
    description: 'TBD',
    url: '#',
    status: 'TODO',
    color: 'bg-indigo-100',
  },
  {
    title: '4. Biological Intelligence Primer: The Brain',
    description: 'How does the brain work?',
    url: '#',
    status: 'TODO',
    color: 'bg-indigo-100',
  },
  {
    title: '5. Brain-Inspired Spiking Neural Networks',
    description: 'TBD',
    source: '/braid-docs/images/neuromorphic/neuromorphic.webp',
    url: '/snn',
    status: 'In Progress',
    color: 'bg-teal-50',
  },
  {
    title: '6. Cerebellum-Inspired Circuits',
    description: 'TBD',
    status: 'TODO',
    url: '#',
    color: 'bg-indigo-100',
  },
]

function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="sticky left-0 top-0 z-20 w-full bg-white dark:bg-slate-900"
    >
      <div className="flex w-full flex-none flex-wrap items-center justify-between bg-white px-4 transition duration-500 sm:px-6 lg:px-8 dark:bg-transparent dark:shadow-none">
        <div className="flex h-16 w-full justify-between">
          <div className="flex w-full justify-between">
            <div className="flex shrink-0 items-center">
              <Link href="/" aria-label="Home page" className="flex">
                <Logomark className="h-9 w-9 lg:hidden" />
                <Logo />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/braid-docs/docs"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
              >
                Docs
              </a>
            </div>
          </div>

          <div className="-mr-2 flex items-center gap-2 sm:gap-4">
            <div className="sm:hidden">
              {/* <DisclosureButton className="focus:outline-hidden group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-indigo-900 dark:hover:text-gray-200">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="group-data-open:hidden block size-6"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="group-data-open:block hidden size-6"
                />
              </DisclosureButton> */}
            </div>
            {/* <LevelSelectorMenu className="relative z-10 my-5 ml-2" /> */}
            <ThemeSelector className="relative z-10 my-5 ml-2" />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            href="/braid-docs/docs"
            className="dark: block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-900 dark:hover:text-gray-300"
          >
            Docs
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="dark: block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-900 dark:hover:text-gray-300"
          >
            About
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default function HomePage({ children }) {
  return (
    <div className="flex w-full flex-col">
      <Navbar />

      {/* Section 1: Intro */}
      <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 px-6 py-20 lg:px-8 dark:bg-slate-900 dark:bg-none">
        <div className="mx-auto max-w-3xl">
          <h2 className="mt-2 text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
            Cerebellum-Inspired Hardware Research
          </h2>
          <p className="mt-8 text-pretty text-center text-lg text-gray-800 sm:text-xl/8 dark:text-gray-300">
            This is a work-in-progress resource to communicate some of the
            technical ideas and potential impacts of our neuromorphic research
            inquiries.
          </p>
        </div>
      </div>

      {/* Section 1: Chapters */}
      <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
        <div
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12"
        >
          {chapters.map((item, index) => (
            <Link
              href={item.url}
              className={`flex cursor-pointer items-stretch gap-4 rounded-lg border transition-colors dark:bg-slate-700 dark:hover:bg-slate-600 ${index === 0 ? 'col-span-1 h-48 items-center justify-center bg-gray-50 p-16 md:col-span-2' : ''}`}
              key={`${item.title}-${index}`}
            >
              {index !== 0 && (
                <div
                  className={`flex h-full min-h-32 w-32 items-center justify-center rounded rounded-r-none ${item.color} flex-shrink-0 flex-grow-0`}
                >
                  {item.status}
                </div>
              )}
              <div
                className={`p-4 ${index === 0 ? 'flex flex-col items-center justify-center text-2xl' : ''}`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p
                  className={` ${index === 0 ? 'text-center text-lg' : 'text-sm'}`}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* footer */}
      <footer className="mt-32 flex items-center justify-center bg-gray-50 p-16 dark:bg-slate-900">
        <p>Footer Text...</p>
      </footer>
    </div>
  )
}
