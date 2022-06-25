import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
  Modal,
  Text,
  Button,
  Card,
  ButtonGroup,
} from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import Clock from './clock';
import StartStopButton from './start_stop_button';
import isLoggedIn from '../../utils/isLoggedIn';
import startSession from './session/start_session';
import stopSession from './session/stop_session';
import rejoinSession from './session/rejoin_session';

const Timer = ({}) => {
  const [timer, setTimer] = useState(1500000);
  const [intervalId, setIntervalId] = useState(0);
  const [isGroup, setIsGroup] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [rejoinProgress, setRejoinProgress] = useState(false);

  useEffect(() => {
    rejoinSession(setTimer, setRejoinProgress).then(() => {
      if (rejoinProgress) {
        setInProgress(true);
        const id = setInterval(() => {
          setTimer((timer) => timer - 1000);
        }, 1000);
        setIntervalId(id);
      }
    });
  }, [rejoinProgress]);

  useEffect(() => {
    if (timer < 1000) {
      stop();
    }
  });

  const start = () => {
    setInProgress(true);
    const id = setInterval(() => {
      setTimer((timer) => timer - 1000);
    }, 1000);
    setIntervalId(id);
    startSession(timer / 1000);
  };

  const stop = () => {
    clearInterval(intervalId);
    setInProgress(false);
    setTimer(1500000);
    stopSession();
  };

  const toggleGroup = () => {
    setIsGroup(!isGroup);
  };

  let toggle;
  if (inProgress) {
    toggle = <></>;
  } else {
    toggle = (
      <Toggle checked={isGroup} onChange={toggleGroup} disabled={!isLoggedIn()}>
        {isGroup ? 'Group' : 'Solo'}
      </Toggle>
    );
  }

  let slider;
  if (inProgress) {
    slider = <></>;
  } else {
    slider = (
      <Slider
        disabled={inProgress}
        value={timer}
        minimumValue={1000}
        maximumValue={3600000}
        step={1000}
        onValueChange={(value) => setTimer(value)}
        containerStyle={styles.slider}
      />
    );
  }

  let button;
  if (isGroup && !inProgress) {
    button = (
      <ButtonGroup>
        <Button style={styles.button} onPress={() => setChatVisible(true)}>
          Chat
        </Button>
        <StartStopButton
          progress={inProgress}
          style={styles.button}
          start={start}
          stop={stop}
        />
        <Button style={styles.button} onPress={() => setAddVisible(true)}>
          Add
        </Button>
      </ButtonGroup>
    );
  } else {
    button = (
      <StartStopButton
        progress={inProgress}
        style={styles.button}
        start={start}
        stop={stop}
      />
    );
  }

  return (
    <Layout style={styles.container}>
      <Modal visible={chatVisible}>
        <Card>
          <Text>chat here</Text>
          <Button onPress={() => setChatVisible(false)}>Close</Button>
        </Card>
      </Modal>
      <Modal visible={addVisible}>
        <Card>
          <Text>Friend list here</Text>
          <Button onPress={() => setAddVisible(false)}>Close</Button>
        </Card>
      </Modal>
      {toggle}
      <Clock interval={timer} style={styles.time}></Clock>
      {slider}
      {button}
    </Layout>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 250,
    height: 50,
  },
  time: {
    fontSize: 76,
    textAlign: 'center',
  },
  button: {
    width: 80,
  },
});
