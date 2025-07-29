import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { navigation } from '@/lib/navigation.mjs'
import { useLevel } from './LevelProvider'

export function Navigation({ className, onLinkClick }) {
  let pathname = usePathname()
  const { userLevel, currentChapter, setCurrentChapter } = useLevel()
  console.log(currentChapter)
  // Filter navigation based on chapter level
  const selectedChapter = navigation.find(
    (section) => section.chapter === currentChapter,
  )

  function getChapterNav(chapter) {
    return (
      <div className="border-b border-r border-gray-100 bg-white">
        <div className="flex items-center justify-between py-6">
          {selectedChapter.chapter > 1 ? (
            <button
              className="flex h-[30px] w-[30px] items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() =>
                setCurrentChapter(Math.max(selectedChapter.chapter - 1, 1))
              }
            >
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : (
            <span className="w-[30px]"></span>
          )}
          <div>
            <h2 className="text-center font-display font-medium text-slate-900 dark:text-white">
              Chapter {selectedChapter.chapter}
            </h2>
            <h2 className="text-center font-display font-medium text-slate-900 dark:text-white">
              {selectedChapter.title}
            </h2>
          </div>
          {selectedChapter.chapter < 7 ? (
            <button
              className="flex h-[30px] w-[30px] items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() =>
                setCurrentChapter(Math.min(selectedChapter.chapter + 1, 8))
              }
            >
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <span className="w-[30px]"></span>
          )}
        </div>
      </div>
    )
  }

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      {getChapterNav()}
      <ul
        role="list"
        className="mt-2 space-y-2 border-l-2 border-slate-100 sm:px-2 lg:mt-4 lg:space-y-4 lg:border-slate-200 lg:pl-4 lg:pr-4 dark:border-slate-800"
      >
        {selectedChapter.links
          .filter((link) => userLevel === 0 || link.level.includes(userLevel))
          .map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={clsx(
                  'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                  link.href === pathname
                    ? 'font-semibold text-sky-500 before:bg-sky-500'
                    : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
                )}
              >
                {link.title}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}
