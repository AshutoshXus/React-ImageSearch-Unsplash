import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false)
  const [searchText, setSearchText] = useState('cat')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setDarkTheme(newDarkTheme)
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme', newDarkTheme)
  }

  const updateSearchText = (text) => {
    setSearchText(text)
  }
  return (
    <AppContext.Provider
      value={{ isDarkTheme, searchText, updateSearchText, toggleDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
