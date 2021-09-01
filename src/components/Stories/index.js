/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import Container from './Container';
import GlobalContext from './context/Global';

const Stories = (props) => {
  useEffect(() => {
    props.stories.forEach((s, i) => {
      const images = [];
      const url =
        typeof s === 'object' && s.url && (s.type === 'image' || !s.type)
          ? s.url
          : typeof s === 'string'
          ? s
          : null;
      if (url) {
        images[i] = new Image();
        images[i].src = url;
      }
    });
  }, [props.stories]);

  const context = {
    stories: props.stories.map((s) => {
      if (typeof s === 'string') return { url: s };
      return s;
    }),
    width: props.width,
    height: props.height,
    loader: props.loader,
    header: props.header,
    storyStyles: props.storyStyles,
    loop: props.loop,
    defaultInterval: props.defaultInterval,
    isPaused: props.isPaused,
    currentIndex: props.currentIndex,
    onStoryStart: props.onStoryStart,
    onStoryEnd: props.onStoryEnd,
    onAllStoriesEnd: props.onAllStoriesEnd,
    onPreviousStory: props.onPreviousStory,
  };
  return (
    <GlobalContext.Provider value={context}>
      <Container />
    </GlobalContext.Provider>
  );
};

Stories.defaultProps = {
  width: 360,
  height: 640,
  defaultInterval: 4000,
};

export default Stories;
