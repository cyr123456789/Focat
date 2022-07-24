import { StyleSheet } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';

const SliderComponent = (props) => {
  return props.inProgressStatus ? (
    <></>
  ) : (
    <Slider
      disabled={props.inProgressStatus}
      value={props.timer}
      minimumValue={1000}
      maximumValue={3600000}
      step={1000}
      onValueChange={(value) => props.setTimer(value)}
      containerStyle={styles.slider}
    />
  );
};

export default SliderComponent;

const styles = StyleSheet.create({
  slider: {
    width: 250,
    height: 50,
  },
});
