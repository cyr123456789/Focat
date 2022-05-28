import React, { useState } from 'react';
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
import Clock from '../../components/clock';
import StartStopButton from '../../components/start_stop_button';

const Timer = ({}) => {
  const [timer, setTimer] = useState(1500000);
  const [disableSlider, setDisableSlider] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [groupToggleText, setGroupToggleText] = useState('Solo');
  const [intervalId, setIntervalId] = useState(0);
  const [chatVisible, setChatVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const start = () => {
    setDisableSlider(true);
    const id = setInterval(() => {
      setTimer((timer) => timer - 1000);
    }, 1000);
    setIntervalId(id);
  };

  const stop = () => {
    clearInterval(intervalId);
    setDisableSlider(false);
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
        minimumValue={0}
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
        <StartStopButton style={styles.button} start={start} stop={stop} />
        <Button style={styles.button} onPress={() => setAddVisible(true)}>
          Add
        </Button>
      </ButtonGroup>
    );
  } else {
    button = (
      <StartStopButton style={styles.button} start={start} stop={stop} />
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
      <Toggle checked={isGroup} onChange={toggleGroup}>
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
