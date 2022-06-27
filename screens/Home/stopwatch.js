import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import Clock from './clock';
import StartStopButton from './start_stop_button';

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [inProgress, setInProgress] = useState(false);

  const start = () => {
    const id = setInterval(() => {
      setTimer((timer) => timer + 1000);
    }, 1000);
    setIntervalId(id);
    setInProgress(true);
  };

  const stop = () => {
    clearInterval(intervalId);
    setTimer(0);
    setInProgress(false);
  };

  return (
    <Layout style={styles.container}>
      <Clock interval={timer} style={styles.time} />
      <StartStopButton
        progress={inProgress}
        style={styles.button}
        start={start}
        stop={stop}
      />
    </Layout>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 76,
    textAlign: 'center',
  },
  button: {
    width: 80,
  },
});
