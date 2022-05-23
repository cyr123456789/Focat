import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import CountDown from 'react-native-countdown-component';
import { Slider } from '@miblanchard/react-native-slider';

const Home = ({}) => {
  const [timerDuration, setTimerDuration] = useState(3600);
  const [disableSlider, setDisableSlider] = useState(false);
  const [running, setRunning] = useState(false);
  const toggleRunning = () => {
    setRunning(!running);
    setDisableSlider(!disableSlider);
  };
  const setTimer = (value) => {
    setTimerDuration(value);
  };
  return (
    <Layout style={styles.container}>
      <Text>Insert quote of the day</Text>
      <Image
        style={styles.logo}
        source={require('../../assets/peachcat.png')}
      ></Image>
      <CountDown
        until={timerDuration}
        size={30}
        running={running}
        digitStyle={{ backgroundColor: '#FFFFFF' }}
        timeLabels={{}}
        timeToShow={['H', 'M', 'S']}
        showSeparator
      />
      <Slider
        disabled={disableSlider}
        value={timerDuration}
        minimumValue={0}
        maximumValue={7200}
        step={60}
        onValueChange={(value) => setTimer(value)}
        containerStyle={styles.slider}
      />
      <Button style={styles.button} onPress={toggleRunning}>
        {running ? 'Stop' : 'Start'}
      </Button>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  slider: {
    width: 250,
    height: 50,
  },
  button: {
    alignItems: 'center',
    margin: 15,
  },
});
