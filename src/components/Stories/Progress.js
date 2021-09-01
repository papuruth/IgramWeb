import React, { useContext } from 'react';
import ProgressWrapper from './ProgressWrapper';
import ProgressCtx from './context/Progress';

const styles = {
  inner: {
    background: '#fff',
    height: '100%',
    maxWidth: '100%',
    borderRadius: 2,
    transformOrigin: 'center left',

    WebkitBackfaceVisibility: 'hidden',
    MozBackfaceVisibility: 'hidden',
    msBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',

    WebkitPerspective: 1000,
    MozPerspective: 1000,
    msPerspective: 1000,
    perspective: 1000,
  },
};

export default (props) => {
  const { bufferAction, count, pause } = useContext(ProgressCtx);

  const getProgressStyle = ({ active }) => {
    switch (active) {
      case 2:
        return { width: '100%' };
      case 1:
        return { transform: `scaleX(${count / 100})` };
      case 0:
        return { width: 0 };
      default:
        return { width: 0 };
    }
  };

  const { width, active } = props;
  return (
    <ProgressWrapper width={width} pause={pause} bufferAction={bufferAction}>
      <div style={{ ...getProgressStyle({ active }), ...styles.inner }} />
    </ProgressWrapper>
  );
};
