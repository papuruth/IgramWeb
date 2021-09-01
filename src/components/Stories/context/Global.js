import React from 'react'

const GlobalContext = React.createContext({
    stories: [],
    defaultInterval: 4000,
    width: 360,
    height: 640
})

export default GlobalContext