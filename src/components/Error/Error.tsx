import { Button, Typography } from '@material-ui/core';
import { Loop } from '@material-ui/icons';
import React from 'react';
import { ReactComponent as ErrorImage } from './error.svg';
const Error = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 10px 0 10px',
        }}
      >
        <Typography variant="h6">
          Couldn't connect to server. Make sure the server is running.
        </Typography>
        <Button
          startIcon={<Loop />}
          color="primary"
          onClick={() => window.location.reload()}
          variant="contained"
        >
          Reload
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ErrorImage style={{ maxWidth: 600 }} />
      </div>
    </>
  );
};

export default Error;
