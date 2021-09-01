import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from './context/Global';
import SeeMore from './SeeMore';
import { SeenText, StoriesSeenContainer } from './styles';
import globalStyle from './styles.css';

const styles = {
  story: {
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  },
  storyContent: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    margin: 'auto',
  },
  avatar: {
    height: '20px',
    width: '20px',
  },
};

const Story = (props) => {
  const { story, action, playState, getVideoDuration } = props;
  const [loaded, setLoaded] = useState(false);

  const { width, height, loader, storyStyles } = useContext(GlobalContext);

  useEffect(() => {
    if (typeof story === 'object' && story.content) {
      setLoaded(true);
      action('play', true);
    } else {
      setLoaded(false);
      action('pause', true);
      if (vid.current) {
        vid.current.addEventListener('waiting', () => {
          action('pause', true);
        });
        vid.current.addEventListener('playing', () => {
          action('play', true);
        });
      }
    }
  }, [story, action]);

  let vid = useRef(null);

  useEffect(() => {
    if (vid.current) {
      if (playState) {
        vid.current.pause();
      } else {
        vid.current.play().catch((e) => console.log(e));
      }
    }
  }, [playState]);

  const imageLoaded = () => {
    try {
      setLoaded(true);
      action('play', true);
    } catch (e) {
      console.log(e);
    }
  };

  const videoLoaded = () => {
    try {
      getVideoDuration(vid.current.duration);
      if (vid.current) {
        vid.current
          .play()
          .then(() => {
            imageLoaded();
          })
          .catch((e) => {
            action('pause');
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getStoryContent = () => {
    const InnerContent = typeof story === 'object' && story.content;
    if (InnerContent) {
      return <InnerContent action={action} isPaused={playState} />;
    }
    const source =
      typeof story === 'object' ? story.url : story;
    const storyContentStyles =
      (typeof story === 'object' && story.styles) ||
      storyStyles ||
      styles.storyContent;
    const type =
      typeof story === 'object' && story.type === 'video'
        ? 'video'
        : 'image';
    return type === 'image' ? (
      <img style={storyContentStyles} alt="story-content" src={source} onLoad={imageLoaded} />
    ) : type === 'video' ? (
      <video
        ref={vid}
        style={storyContentStyles}
        src={source}
        controls={false}
        onLoadedData={videoLoaded}
        autoPlay
        playsInline
      />
    ) : null;
  };

  const { viewers } = story;
  return (
    <div style={{ ...styles.story, height }}>
      {getStoryContent()}
      {!loaded && (
        <div
          style={{
            width,
            height,
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ccc',
          }}>
          {loader || <div className={globalStyle.spinner} />}
        </div>
      )}
      {typeof story === 'object' && story.seeMore && (
        <div
          style={{
            position: 'absolute',
            margin: 'auto',
            bottom: 0,
            zIndex: 9999,
            width: '100%',
            height: 'auto',
          }}>
          <SeeMore seeMoreContent={story.seeMore} />
        </div>
      )}
      {viewers && (
        <StoriesSeenContainer>
          <AvatarGroup>
            {viewers.slice(0, 3).map(({ pk, profile_pic_url, username }) => (
              <Avatar
                key={pk}
                alt={username}
                src={profile_pic_url}
                style={styles.avatar}
              />
            ))}
          </AvatarGroup>
          <SeenText>Seen by {viewers.length}</SeenText>
        </StoriesSeenContainer>
      )}
    </div>
  );
};

export default Story;
