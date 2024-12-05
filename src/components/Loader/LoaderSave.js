import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoaderSave = ({ isWindow }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PulseLoader
        color={'#6da305'}
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoaderSave;
