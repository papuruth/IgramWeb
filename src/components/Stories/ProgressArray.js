import React, { useContext } from 'react';
import Progress from './Progress';
import ProgressCtx from './context/Progress';

const styles = {
  progressArr: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    flexWrap: 'row',
    position: 'absolute',
    width: '100%',
    background: '#262626',
    marginTop: 40,
    padding: '16px 0px',
    alignSelf: 'center',
    zIndex: 99,
  },
};

export default () => {
  const { numArray, currentId } = useContext(ProgressCtx);
  return (
    <div style={styles.progressArr}>
      {numArray.map((i) => (
        <Progress
          key={i}
          width={1 / numArray.length}
          active={i === currentId ? 1 : i < currentId ? 2 : 0}
        />
      ))}
    </div>
  );
};
