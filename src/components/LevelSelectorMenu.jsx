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
      {/* <path
        d="M2.5 7.5L10 4l7.5 3.5M4.5 9.5v3a2.5 2.5 0 005 0v-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5v5a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5v-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
    </svg>
  )
}

export function LevelSelectorMenu() {
  const { userLevel, setUserLevel } = useLevel()

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button
            className="ml-4 w-32"
            aria-label="Select expertise level"
          >
            <span className="text-sm font-medium text-gray-500 dark:text-white">
              Level:{' '}
              {userLevel === 1
                ? 'Beginner'
                : userLevel === 2
                  ? 'Intermediate'
                  : 'Advanced'}
            </span>
          </Popover.Button>
          <Popover.Panel className="absolute right-0 z-20 mt-2 w-96">
            <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
              <LevelSelector
                initialLevel={userLevel}
                onLevelChange={setUserLevel}
                onClose={close}
              />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}
