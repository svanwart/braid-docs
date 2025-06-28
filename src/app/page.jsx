'use client'
import Link from 'next/link'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Logo, Logomark } from '@/components/Logo'
import { ThemeSelector } from '@/components/ThemeSelector'
import { LevelSelectorMenu } from '@/components/LevelSelectorMenu'
import LinkCard from '@/components/LinkCard'
import { useState } from 'react'
import { audienceItems } from './data/audiences'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
const { generalPublic, policymakers, engineeringStudents, researchers } =
  audienceItems

// const chapters = [
//   {
//     title: 'Executive Summary',
//     description: 'About this research project',
//     source: 'https://picsum.photos/300/300.jpg?a=0',
//     url: '/docs',
//   },
//   {
//     title: 'Computer Hardware',
//     description: 'How does a mix of metal, sand, and glass make a computer?',
//     source: '/braid-docs/images/computers/computer.jpg',
//     url: '/docs',
//   },
//   {
//     title: 'Biological Hardware: The Brain',
//     description: 'How does the brain work?',
//     source: '/braid-docs/images/brain/brain-card.png',
//     url: '/docs/the-brain',
//   },
//   {
//     title: 'Artificial Intelligence',
//     description: 'TBD',
//     source: '/braid-docs/images/ai/machine-learning.webp',
//     url: '/docs/ai',
//   },
//   {
//     title: 'Nanomaterials Research',
//     description: 'TBD',
//     source: '/braid-docs/images/materials/memtransistor.webp',
//     url: '#',
//   },
//   {
//     title: 'Brain-Inspired Computing (Neuromorphic Computing)',
//     description: 'TBD',
//     source: '/braid-docs/images/neuromorphic/neuromorphic.webp',
//     url: '/docs/neuromorphic-computing',
//   },
//   {
//     title: 'Cerebellum-Inspired Circuits',
//     description: 'TBD',
//     source: 'https://picsum.photos/300/300.jpg?a=4',
//     url: '/docs/cerebellum-inspired-hardware',
//   },
//   {
//     title: 'Applications',
//     description: '3.9 MB',
//     source: 'https://picsum.photos/300/300.jpg?a=5',
//     url: '#',
//   },
//   {
//     title: 'Broader Impacts',
//     description: '3.9 MB',
//     source: 'https://picsum.photos/300/300.jpg?a=6',
//     url: '#',
//   },
// ]

const footerLinks = {
  research: [
    { name: 'TODO', href: '#' },
    { name: 'TODO', href: '#' },
  ],
  interactives: [
    { name: 'TODO', href: '#' },
    { name: 'TODO', href: '#' },
  ],
  company: [
    { name: 'TODO', href: '#' },
    { name: 'TODO', href: '#' },
  ],
  legal: [
    { name: 'TODO', href: '#' },
    { name: 'TODO', href: '#' },
    { name: 'License', href: '#' },
  ],
}

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
            {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/braid-docs/docs"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
              >
                Docs
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
              >
                About
              </a>
            </div> */}
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

function TabbedSection() {
  const [activeTab, setActiveTab] = useState(0)
  const audiences = [
    generalPublic,
    policymakers,
    engineeringStudents,
    researchers,
  ]
  const tabs = audiences.map((audience, idx) => {
    return {
      id: idx,
      name: audience.tabTitle,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {audience.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {audience.description}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {audience.pages.map((item, idx) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-lg bg-gray-50 dark:bg-slate-700"
              >
                <div
                  className={`flex h-full w-32 items-center justify-center rounded ${item.color} flex-shrink-0 flex-grow-0`}
                >
                  {/* Optional: icon or image */}
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  })

  return (
    <div className="mx-auto max-w-6xl">
      {/* Desktop Tab Navigation */}
      <div className="hidden border-b border-gray-200 md:block dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              } `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown Navigation */}
      <div className="md:hidden">
        <Listbox
          value={tabs[activeTab]}
          onChange={(tab) => setActiveTab(tab.id)}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg border-2 bg-white py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-slate-800 dark:text-white">
              <span className="block truncate font-medium">
                {tabs[activeTab].name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800">
              {tabs.map((tab) => (
                <Listbox.Option
                  key={tab.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                      active
                        ? 'bg-sky-100 text-sky-900 dark:bg-sky-900 dark:text-sky-100'
                        : 'text-gray-900 dark:text-gray-100'
                    }`
                  }
                  value={tab}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {tab.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <div className="min-h-[300px]">{tabs[activeTab].content}</div>
      </div>
    </div>
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
            This is a work-in-progress resource to explore selected ideas and
            impacts of neuromorphic research...
          </p>
        </div>
      </div>
      <div className="bg-white px-6 py-12 lg:px-8 dark:bg-slate-900 dark:bg-none">
        <TabbedSection />
      </div>

      {/* Section 2: Modules */}
      {/* <div className="bg-gray-100 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12 lg:grid-cols-3"
          >
            {chapters.map((chapter, index) => (
              <LinkCard
                key={`${chapter.title}-${index}`}
                title={chapter.title}
                description={chapter.description}
                imgUrl={chapter.source}
                url={chapter.url}
                index={index}
              />
            ))}
          </div>
        </div>
      </div> */}

      {/* footer */}
      <footer className="mt-96 bg-gray-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <img
              alt="Company name"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-9"
            />
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Research
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerLinks.research.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Interactive Tools
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerLinks.interactives.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Policy Implications
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerLinks.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Source Code
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerLinks.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
