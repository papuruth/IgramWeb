import React from 'react';

const styles = {
  progress: {
    height: 2,
    maxWidth: '100%',
    background: '#555',
    margin: 2,
    borderRadius: 2,
    transition: 'opacity 400ms ease-in-out',
  },
};

const ProgressWrapper = (props) => {
  const { children } = props;
  return (
    <div style={{ ...styles.progress, ...getProgressWrapperStyle(props) }}>
      {children}
    </div>
  );
};

const getProgressWrapperStyle = ({ width, pause, bufferAction }) => ({
  width: `${width * 100}%`,
  opacity: pause && !bufferAction ? 0 : 1,
});

export default ProgressWrapper;
