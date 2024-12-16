import React from 'react';
import { RingLoader } from 'react-spinners';

const Loader = ({ isWindow }) => {
  return (
    <div
      style={
        isWindow
          ? {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f2f2f25a',
              borderRadius: '6pxy',
            }
          : {
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }
      }
    >
      <RingLoader
        color={'#6da305'}
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
