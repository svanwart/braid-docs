'use client'

import { Popover } from '@headlessui/react'
import { LevelSelector } from './LevelSelector'
import { useLevel } from './LevelProvider'

function GraduationCapIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.5 7.5L10 4l7.5 3.5M4.5 9.5v3a2.5 2.5 0 005 0v-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5v5a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5v-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LevelSelectorMenu() {
  const { userLevel, setUserLevel } = useLevel()

  return (
    <Popover className="relative">
      <Popover.Button
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1.5 shadow-md ring-1 ring-black/5 transition hover:bg-sky-50 dark:bg-slate-700 dark:ring-inset dark:ring-white/5 dark:hover:bg-sky-900"
        aria-label="Select expertise level"
      >
        <GraduationCapIcon className="h-6 w-6 text-sky-500 dark:text-sky-400" />
      </Popover.Button>
      <Popover.Panel className="absolute right-0 z-20 mt-2 w-72">
        <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
          <LevelSelector
            initialLevel={userLevel}
            onLevelChange={setUserLevel}
          />
        </div>
      </Popover.Panel>
    </Popover>
  )
}
