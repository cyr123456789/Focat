import { Button } from '@ui-kitten/components';

const StartStopButton = ({ startStop, setStartStop, start, stop, style }) => {
  let button;
  if (startStop) {
    button = (
      <Button
        style={style}
        onPress={() => {
          start();
          setStartStop(false);
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
