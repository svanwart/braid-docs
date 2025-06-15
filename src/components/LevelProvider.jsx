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
  const [userLevel, setUserLevel] = useState(1)

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel')
    if (savedLevel) {
      setUserLevel(Number(savedLevel))
    }
  }, [])

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
