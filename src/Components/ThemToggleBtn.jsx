// src/App.jsx
import { useState, useEffect } from 'react'


export default function ThemToggleBtn() {
  // 1. Determine initial theme once on mount
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    // no stored preference → use OS setting
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // 2. Whenever `theme` changes, sync <html> class & localStorage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  // 3. Toggler
  const toggleTheme = () =>
    setTheme(curr => (curr === 'dark' ? 'light' : 'dark'))

  return (
    <>
     <div>
    <button onClick={toggleTheme} className="bg-gray-800 text-white px-4 py-2 rounded">
         {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
    </>

  )
}