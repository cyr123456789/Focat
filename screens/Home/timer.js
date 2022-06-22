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
import startSession from './start_session';
import stopSession from './stop_session';

const Timer = ({}) => {
  const [timer, setTimer] = useState(1500000);
  const [startStop, setStartStop] = useState(true);
  const [disableSlider, setDisableSlider] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [groupToggleText, setGroupToggleText] = useState('Solo');
  const [intervalId, setIntervalId] = useState(0);
  const [chatVisible, setChatVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [loggedIn] = useState(!isLoggedIn());

  useEffect(() => {
    if (timer < 1000) {
      stop();
    }
  });

  const start = () => {
    setDisableSlider(true);
    const id = setInterval(() => {
      setTimer((timer) => timer - 1000);
    }, 1000);
    setIntervalId(id);
    startSession(timer / 1000);
  };

  const stop = () => {
    clearInterval(intervalId);
    setDisableSlider(false);
    setTimer(1500000);
    stopSession();
    setStartStop(true);
  };

  const toggleGroup = () => {
    setIsGroup(!isGroup);
    groupToggleText === 'Solo'
      ? setGroupToggleText('Group')
      : setGroupToggleText('Solo');
  };

  let slider;
  if (disableSlider) {
    slider = <></>;
  } else {
    slider = (
      <Slider
        disabled={disableSlider}
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
  if (isGroup) {
    button = (
      <ButtonGroup>
        <Button style={styles.button} onPress={() => setChatVisible(true)}>
          Chat
        </Button>
        <StartStopButton
          startStop={startStop}
          setStartStop={setStartStop}
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
        startStop={startStop}
        setStartStop={setStartStop}
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
      <Toggle checked={isGroup} onChange={toggleGroup} disabled={loggedIn}>
        {groupToggleText}
      </Toggle>
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
