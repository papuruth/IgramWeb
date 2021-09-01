import React from 'react'

export default React.createContext({
    numArray: [],
    currentId: 0,
    count: 0,
    currentStory: { url: '' },
    videoDuration: 0,
    bufferAction: false,
    pause: false
})