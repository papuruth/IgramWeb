import React from 'react';

const styles = {
  seeMore: {
    height: '10vh',
    background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2))',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  seeMoreExpanded: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    zIndex: 99999,
  },
  seeMoreText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: '0.1em',
    marginBottom: '2.2vh',
    textTransform: 'capitalize',
    opacity: '1',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.8em',
    transition: 'opacity 300ms ease-in-out',
  },
  seeMoreIcon: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: '0.2em',
    marginBottom: '0.4vh',
    opacity: '1',
    filter: 'drop-shadow(0 0 5px black)',
    textTransform: 'capitalize',
    transition: 'opacity 300ms ease-in-out',
  },
  seeMoreClose: {
    position: 'absolute',
    filter: 'drop-shadow(0 3px 2px #ccc)',
    right: '0.5rem',
    top: '0.5rem',
    fontSize: '1.5rem',
    opacity: '0.7',
    padding: '1rem',
  },
  seeMoreContent: {
    display: 'none',
  },
};

export default function SeeMore(props) {
  let seeMoreRef = React.useRef(null);
  const { seeMoreContent } = props;
  const openLink = () => {
    seeMoreRef.click();
  };
  return (
    <div
      onClick={openLink}
      role="button"
      tabIndex={0}
      onKeyPress={openLink}
      style={styles.seeMore}>
      <a
        href={seeMoreContent}
        style={styles.seeMoreContent}
        target="_blank"
        rel="noopener noreferrer"
        ref={(linkRef) => {
          seeMoreRef = linkRef;
        }}>
        See More
      </a>
      <span style={styles.seeMoreText}>See more {'>'}</span>
    </div>
  );
}
