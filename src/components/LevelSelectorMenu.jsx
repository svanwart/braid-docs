'use client'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { levels } from './LevelSelector'

import { useApp } from './AppContext'

export function LevelSelectorMenu() {
  const { userLevel, handleLevelChange } = useApp()
  const [activeTab, setActiveTab] = useState(0)
  const tabs = levels.map((level, idx) => {
    return {
      id: level.id,
      name: level.name,
      content: (
        <div className="space-y-4">
          <h3 className="mb-2 mt-8 text-xl font-semibold text-gray-900 dark:text-white">
            {level.name}
          </h3>
          {level.name}
        </div>
      ),
    }
  })

  const boxStyling = {
    marginTop: '-68px',
    padding: '10px 30px',
  }

  return (
    <div
      className="m-auto mx-0 bg-white px-6 py-12 md:max-w-4xl lg:px-8 dark:bg-slate-900 dark:bg-transparent dark:bg-none"
      style={boxStyling}
    >
      {/* Desktop Tab Navigation */}
      <div className="hidden border-b border-gray-200 md:block dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleLevelChange(tab.id)}
              className={`text-md whitespace-nowrap border-b-2 px-1 py-4 font-medium ${
                userLevel === tab.id
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
            <Listbox.Button className="relative mt-4 w-full cursor-pointer rounded-lg border-2 bg-white py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-slate-800 dark:text-white">
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
    </div>
  )
}
