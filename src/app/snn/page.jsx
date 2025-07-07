'use client'
import Link from 'next/link'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Logo, Logomark } from '@/components/Logo'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useState } from 'react'
import { tiers } from '../data/snn'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
const { tier1, tier2, tier3 } = tiers

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
  const audiences = [tier1, tier2, tier3]
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
        <div className="m-auto max-w-5xl px-6 py-12 lg:px-8">
          <h2 className="mt-2 text-center text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Spiking Neural Networks
          </h2>
          <p className="mt-8 text-pretty text-center text-lg text-gray-800 sm:text-xl/8 dark:text-gray-300">
            The goal of this page is to provide enough context and intuition
            about Spiking Neural Networks (SNNs) so that different audiences can
            understand how they work, how they differ from other types of neural
            networks, and potential uses.
          </p>
        </div>
      </div>
      <div className="m-auto max-w-5xl bg-white px-6 py-12 lg:px-8 dark:bg-slate-900 dark:bg-none">
        <TabbedSection />
      </div>
    </div>
  )
}
