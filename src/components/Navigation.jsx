import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { navigation } from '@/lib/navigation.mjs'
import { useLevel } from './LevelProvider'

export function Navigation({ className, onLinkClick }) {
  let pathname = usePathname()
  const { userLevel } = useLevel()
  console.log(navigation)
  // Filter navigation based on user level
  const filteredNavigation = navigation.filter((section) => {
    // Show all sections if userLevel is 0 (All Levels)
    if (userLevel === 0) return true

    // Filter links within the section
    const filteredLinks = section.links.filter((link) =>
      link.level.includes(userLevel),
    )
    // Only show section if it has visible links
    return filteredLinks.length > 0
  })

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {filteredNavigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
            >
              {section.links
                .filter(
                  (link) => userLevel === 0 || link.level.includes(userLevel),
                )
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
          </li>
        ))}
      </ul>
    </nav>
  )
}
