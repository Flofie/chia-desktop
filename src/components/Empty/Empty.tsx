import { Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as EmptyImage } from './empty.svg';

const Empty = () => {
  return (
    <>
      <Typography variant="h6" style={{}}>
        No Connection added. Please add a connection in the upper right corner
        to get started...
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EmptyImage style={{ maxWidth: 600 }} />
      </div>
    </>
  );
};

export default Empty;
