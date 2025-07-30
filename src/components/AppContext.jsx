'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  navigation,
  getChapterByHref,
  getChapter,
  getLinksByLevel,
} from '@/lib/navigation.mjs'

const AppContext = createContext({
  userLevel: 1,
  setUserLevel: () => {},
  currentChapter: 1,
  setCurrentChapter: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
})

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  // Initialize state with localStorage values if available
  const [userLevel, setUserLevel] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem('userLevel')
      return savedLevel ? Number(savedLevel) : 1
    }
    return 1
  })

  const [currentChapter, setCurrentChapter] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedChapter = localStorage.getItem('currentChapter')
      return savedChapter ? Number(savedChapter) : 1
    }
    return 1
  })

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('currentPage')
      return savedPage ? Number(savedPage) : 1
    }
    return 1
  })

  // Auto-update page based on route changes
  useEffect(() => {
    if (pathname) {
      // Find the current page based on pathname and currentChapter
      const allLinks = navigation.flatMap((section) => section.links)
      const page = allLinks.find((link) => link.href === pathname)
      if (page) {
        // Update page if the page has changed:
        if (page.href !== currentPage) {
          handlePageChange(page.href)

          // change the chapter if necessary:
          const chapter = getChapterByHref(page.href)
          if (chapter.id !== currentChapter) {
            handleChapterChange(chapter.id, false)
          }

          // change the level if necessary:
          const level = page.level.includes(userLevel)
            ? userLevel
            : page.level[0]
          if (level !== userLevel) {
            handleLevelChange(level, false)
          }
        }
      } else {
        console.log(`${pathname} is not in the navigation! Homepage?`)
        // throw new Error(
        //   "Check logic of AppContext useEffect. Something isn't working as expected!",
        // )
      }
    }
    // }
  }, [pathname, currentChapter]) // Add currentChapter to dependencies

  // Update localStorage when level changes
  const handleLevelChange = (level, cascade = true) => {
    setUserLevel(level)
    localStorage.setItem('userLevel', level.toString())

    // set to true if you want level changes to also change the page
    // (to synchronize the page with the level / chapter)
    if (cascade) {
      updatePageToMatchUserPrefs(currentChapter, level)
    }
  }

  // Update localStorage when chapter changes
  const handleChapterChange = (chapterId, cascade = true) => {
    setCurrentChapter(chapterId)
    localStorage.setItem('currentChapter', chapterId.toString())

    // set to true if you want level changes to also change the page
    // (to synchronize the page with the level / chapter)
    if (cascade) {
      updatePageToMatchUserPrefs(chapterId, userLevel)
    }
  }

  const updatePageToMatchUserPrefs = (chapterId, level) => {
    // if necessary, change the page:
    const chapter = getChapter(chapterId)
    const links = getLinksByLevel(chapter, level)
    const page = links.find((link) => link.href === currentPage)
    if (!page) {
      // Navigate to the first available page for this level
      router.push(links[0].href)
    }
  }

  // Update localStorage when page changes
  const handlePageChange = (page) => {
    setCurrentPage(page)
    localStorage.setItem('currentPage', page.toString())
  }

  return (
    <AppContext.Provider
      value={{
        userLevel,
        handleLevelChange,
        currentChapter,
        handleChapterChange,
        currentPage,
        handlePageChange,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
