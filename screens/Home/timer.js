import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Toggle } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import Clock from '../../components/clock';
import StartStopButton from '../../components/start_stop_button';

const Timer = ({}) => {
  const [timer, setTimer] = useState(1500000);
  const [disableSlider, setDisableSlider] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [groupToggleText, setGroupToggleText] = useState('Solo');
  const [intervalId, setIntervalId] = useState(0);
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
  return (
    <Layout style={styles.container}>
      <Toggle checked={isGroup} onChange={toggleGroup}>
        {groupToggleText}
      </Toggle>
      <Clock interval={timer} style={styles.time}></Clock>
      <Slider
        disabled={disableSlider}
        value={timer}
        minimumValue={0}
        maximumValue={3600000}
        step={1000}
        onValueChange={(value) => setTimer(value)}
        containerStyle={styles.slider}
      />
      <StartStopButton start={start} stop={stop} />
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
});
