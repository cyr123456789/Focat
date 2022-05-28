import React, { useState } from 'react';
import { Button } from '@ui-kitten/components';

const StartStopButton = ({ start, stop, style }) => {
  const [bool, setBool] = useState(true);
  let button;
  if (bool) {
    button = (
      <Button
        style={style}
        onPress={() => {
          start();
          setBool(false);
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
          setBool(true);
        }}
      >
        Stop
      </Button>
    );
  }

  return button;
};

export default StartStopButton;
