import React from 'react'

const BlackNWhiteContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  saveList: [],
  onAddOrRemoveList: () => {},
})

export default BlackNWhiteContext
