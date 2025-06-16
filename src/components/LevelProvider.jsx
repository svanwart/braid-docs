'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LevelContext = createContext({
  userLevel: 1,
  setUserLevel: () => {},
})

export function useLevel() {
  return useContext(LevelContext)
}

export function LevelProvider({ children }) {
  // Initialize state with localStorage value if available
  const [userLevel, setUserLevel] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem('userLevel')
      return savedLevel ? Number(savedLevel) : 1
    }
    return 1
  })

  // Update localStorage when level changes
  const handleLevelChange = (level) => {
    setUserLevel(level)
    localStorage.setItem('userLevel', level.toString())
  }

  return (
    <LevelContext.Provider
      value={{ userLevel, setUserLevel: handleLevelChange }}
    >
      {children}
    </LevelContext.Provider>
  )
}
