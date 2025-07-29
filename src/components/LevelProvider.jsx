'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LevelContext = createContext({
  userLevel: 1,
  setUserLevel: () => {},
  currentChapter: 1,
  setCurrentChapter: () => {},
})

export function useLevel() {
  return useContext(LevelContext)
}

export function LevelProvider({ children }) {
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

  // Update localStorage when level changes
  const handleLevelChange = (level) => {
    setUserLevel(level)
    localStorage.setItem('userLevel', level.toString())
  }

  // Update localStorage when chapter changes
  const handleChapterChange = (chapter) => {
    setCurrentChapter(chapter)
    localStorage.setItem('currentChapter', chapter.toString())
  }

  return (
    <LevelContext.Provider
      value={{
        userLevel,
        setUserLevel: handleLevelChange,
        currentChapter,
        setCurrentChapter: handleChapterChange,
      }}
    >
      {children}
    </LevelContext.Provider>
  )
}
