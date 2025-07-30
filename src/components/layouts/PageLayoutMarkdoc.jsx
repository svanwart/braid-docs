'use client'
import { useState, useEffect } from 'react'
import HeaderPanel from '@/components/HeaderPanel'
import { Prose } from '@/components/Prose'
import { Navbar } from '@/components/DocsNavbar'
import { getChapter } from '@/lib/navigation.mjs'
import { Navigation } from '@/components/Navigation'
import { useApp } from '@/components/AppContext'

import { LevelSelectorMenu } from '@/components/TabsSelectLevel'
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 dark:focus:ring-gray-400"
          aria-label="Back to top"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export function PageLayoutMarkdoc({ children, frontmatter, nodes }) {
  const { currentChapter } = useApp()
  const selectedChapter = getChapter(currentChapter)
  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <HeaderPanel title={selectedChapter.title} chapter={currentChapter}>
        {selectedChapter.description}
      </HeaderPanel>

      {/* Main content */}
      {/* <main>
        <Prose>{children}</Prose>
      </main> */}

      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[50px] -ml-0.5 h-[calc(100vh-4.75rem)] w-56 overflow-x-hidden overflow-y-hidden xl:w-64">
            <Navigation userLevel={1} />
          </div>
        </div>
        <h2 className="fixed top-[40vh] -z-10 -rotate-[30deg] text-[150px] font-bold text-gray-100 lg:top-[30vh] lg:text-[250px] dark:text-gray-800">
          Draft
        </h2>

        <div className="flex w-full flex-col">
          <LevelSelectorMenu className="relative z-10" />
          <div className="flex">{children}</div>
        </div>
        {/* Right-hand column for inner page menu */}
        {/* <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 left-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute bottom-0 left-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute bottom-0 left-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.75rem] -mr-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-8 pr-0.5 xl:w-72 xl:pl-16">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                On this page
              </h3>
              Navigation goes here
            </div>
          </div>
        </div> */}
      </div>

      {/* Back to top button */}
      <BackToTopButton />

      {/* Footer */}
      <footer className="mt-36 bg-gray-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <p className="text-md text-center text-gray-500 dark:text-gray-400">
            Footer goes here...
          </p>
        </div>
      </footer>
    </div>
  )
}
