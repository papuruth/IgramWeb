/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useRef, useEffect } from 'react';
import GlobalContext from './context/Global';
import ProgressContext from './context/Progress';
import Story from './Story';
import ProgressArray from './ProgressArray';
import Header from './Header';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: '#111',
    position: 'relative',
  },
};

export default function () {
  const [currentId, setCurrentId] = useState(0);
  const [pause, setPause] = useState(true);
  const [count, setCount] = useState(0);
  const [bufferAction, setBufferAction] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);

  const mousedownId = useRef();
  const animationFrameId = useRef();

  const {
    width,
    height,
    defaultInterval,
    stories,
    loop,
    currentIndex,
    isPaused,
    onStoryStart,
    header,
    onStoryEnd,
    onAllStoriesEnd,
    onPreviousStory,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!pause) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    }
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [currentId, pause]);

  useEffect(() => {
    setCount(0);
  }, [currentId, stories]);

  useEffect(() => {
    if (typeof currentIndex === 'number') {
      if (currentIndex >= 0 && currentIndex < stories.length) {
        setCurrentId(currentIndex);
      } else {
        console.error(
          'Index out of bounds. Current index was set to value more than the length of stories array.',
          currentIndex,
        );
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (typeof isPaused === 'boolean') {
      setPause(isPaused);
    }
  }, [isPaused]);

  const incrementCount = () => {
    setCount((count) => {
      if (count === 0) storyStartCallback();
      const interval = getCurrentInterval();
      if (count < 100) {
        animationFrameId.current = requestAnimationFrame(incrementCount);
      } else {
        next();
      }
      return count + 100 / ((interval / 1000) * 60);
    });
  };

  const storyStartCallback = () => {
    if (onStoryStart) onStoryStart(currentId, stories[currentId]);
  };

  const storyEndCallback = () => {
    if (onStoryEnd) onStoryEnd(currentId, stories[currentId]);
  };

  const allStoriesEndCallback = () => {
    if (onAllStoriesEnd) onAllStoriesEnd();
  };

  const previousStory = () => {
    if (onPreviousStory) onPreviousStory();
  };

  const getCurrentInterval = () => {
    if (stories[currentId].type === 'video') return videoDuration;
    if (typeof stories[currentId].duration === 'number')
      return stories[currentId].duration;
    return defaultInterval;
  };

  const toggleState = (action, bufferAction) => {
    setPause(action === 'pause');
    setBufferAction(!!bufferAction);
  };

  const previous = () => {
    if (currentId > 0) {
      setCurrentId(currentId - 1);
      setCount(0);
    }
    if (currentId === 0) {
      previousStory();
      setCurrentId(0);
    }
  };

  const updateNextStoryIdForLoop = () => {
    setCurrentId((currentId + 1) % stories.length);
    setCount(0);
  };

  const updateNextStoryId = () => {
    if (currentId < stories.length - 1) {
      setCurrentId(currentId + 1);
      setCount(0);
      storyEndCallback();
    } else {
      allStoriesEndCallback();
      storyEndCallback();
    }
  };

  const next = () => {
    if (loop) {
      updateNextStoryIdForLoop();
    } else {
      updateNextStoryId();
    }
  };

  const debouncePause = () => {
    mousedownId.current = setTimeout(() => {
      toggleState('pause');
    }, 200);
  };

  const mouseUp = (e, type) => {
    e.preventDefault();
    if (mousedownId.current) clearTimeout(mousedownId.current);
    if (pause) {
      toggleState('play');
    } else if (type === 'next') next();
    else previous();
  };

  const getVideoDuration = (duration) => {
    setVideoDuration(duration * 1000);
  };
  const isHeader =
    typeof stories[currentId] === 'object' && stories[currentId].header;

  return (
    <div style={{ ...styles.container, ...{ height } }}>
      {isHeader && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            background: '#262626',
            zIndex: 19,
          }}>
          {typeof stories[currentId] === 'object' ? (
            header ? (
              header(stories[currentId].header)
            ) : (
              <Header
                heading={stories[currentId].header.heading}
                subheading={stories[currentId].header.subheading}
                profileImage={stories[currentId].header.profileImage}
              />
            )
          ) : null}
        </div>
      )}
      <ProgressContext.Provider
        value={{
          bufferAction,
          videoDuration,
          numArray: stories.map((_, i) => i),
          currentStory: stories[currentId],
          currentId,
          count,
          pause,
        }}>
        <ProgressArray />
      </ProgressContext.Provider>
      <Story
        action={toggleState}
        bufferAction={bufferAction}
        playState={pause}
        story={stories[currentId]}
        getVideoDuration={getVideoDuration}
      />
      <div
        style={{
          position: 'absolute',
          height,
          width,
          display: 'flex',
        }}>
        <div
          style={{ width: '50%', zIndex: 999999 }}
          role="button"
          tabIndex={0}
          onTouchStart={debouncePause}
          onTouchEnd={(e) => mouseUp(e, 'previous')}
          onMouseDown={debouncePause}
          onMouseUp={(e) => mouseUp(e, 'previous')}
        />
        <div
          style={{ width: '50%', zIndex: 999999 }}
          role="button"
          tabIndex={0}
          onTouchStart={debouncePause}
          onTouchEnd={(e) => mouseUp(e, 'next')}
          onMouseDown={debouncePause}
          onMouseUp={(e) => mouseUp(e, 'next')}
        />
      </div>
    </div>
  );
}
