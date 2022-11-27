import * as React from 'react';
import { Button } from '@mui/material';
import Title from './Title';

export default function Choose() {

  return (
    <React.Fragment>
      <Title>Choose Mode</Title>
        <br></br>
        <br></br>
        <Button
          color="secondary"
          variant="contained"
          size="large"
        >
          Mighty Pong
        </Button>
        <br></br>
        <br></br>
        <Button
          color="secondary"
          variant="contained"
          size="large"
        >
          Classic Pong
        </Button>
    </React.Fragment>
  );
}