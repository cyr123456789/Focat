import React from 'react';
import { Button } from '@ui-kitten/components';

const StartStopButton = ({ progress, start, stop, style }) => {
  let button;
  if (!progress) {
    button = (
      <Button
        style={style}
        onPress={() => {
          start();
        }}
      >
        Start
      </Button>
    );
  } else {
    button = (
      <Button
        style={style}
        onPress={() => {
          stop();
        }}
      >
        Stop
      </Button>
    );
  }

  return button;
};

export default StartStopButton;
