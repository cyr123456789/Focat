import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
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
import { startSession, stopSession } from './sessions';
import { useFocusEffect } from '@react-navigation/native';
import {
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, firestore } from '../../firebase';

const Timer = ({}) => {
  const [timer, setTimer] = useState(1500000);
  // const [isGroup, setIsGroup] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [catCash, setCatCash] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn()) {
        getDoc(doc(firestore, 'users', auth.currentUser.uid))
          .then((userDoc) => {
            return userDoc.data().current_session;
          })
          .then((sessionId) => {
            updateDoc(doc(firestore, 'sessions', sessionId), {
              check_time: serverTimestamp(),
            });
            return sessionId;
          })
          .then((sessionId) => {
            const unsubscribe = onSnapshot(
              doc(firestore, 'sessions', sessionId),
              (sessionDoc) => {
                if (
                  !sessionDoc.data().is_completed &&
                  sessionDoc.data().check_time !== null
                ) {
                  const data = sessionDoc.data();
                  const durationLeft =
                    data.duration -
                    data.check_time.seconds +
                    data.start_time.seconds;
                  if (!inProgress) {
                    setInProgress(true);
                    setTimer(durationLeft * 1000);
                  }
                  if (data.successfully_completed != null) {
                    console.log(data.successfully_completed);
                  }
                } else if (sessionDoc.data().is_completed) {
                  if (sessionDoc.data().successfully_completed) {
                    setInProgress(false);
                    completeAlert();
                  } else {
                    setInProgress(false);
                    incompleteAlert();
                  }
                } else {
                  setInProgress(false);
                }
              },
              (error) => {
                console.log(error.code);
              }
            );
            return () => unsubscribe();
          })
          .catch((e) => console.log(e.code));
      }
    }, [refresh])
  );

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn()) {
        getDoc(doc(firestore, 'users', auth.currentUser.uid))
          .then((userDoc) => {
            return userDoc.data().current_session;
          })
          .then((sessionId) => {
            const unsubscribe = onSnapshot(
              doc(firestore, 'sessions', sessionId),
              (sessionDoc) => {
                if (sessionDoc.data().successfully_completed) {
                  console.log('popup alert');
                }
              },
              (error) => {
                console.log(error.code);
              }
            );
            return () => unsubscribe();
          });
      }
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn()) {
        const unsubscribe = onSnapshot(
          doc(firestore, 'users', auth.currentUser.uid),
          (userDoc) => {
            setCatCash(userDoc.data().cat_cash);
          },
          (error) => {
            console.log(error.code);
          }
        );
        return () => unsubscribe();
      }
    }, [])
  );

  useEffect(() => {
    if (inProgress) {
      const interval = setInterval(() => {
        setTimer((timer) => {
          if (timer <= 1000) {
            clearInterval(interval);
            stopSession().then(() => {
              setTimer(0);
              setInProgress(false);
            });
            // completeAlert();
          } else {
            return timer - 1000;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [inProgress]);

  const start = () => {
    startSession(timer / 1000).then(() => {
      setInProgress(true);
    });
    setRefresh((x) => x + 1);
  };

  const stop = () => {
    stopSession().then(() => {
      setTimer(0);
      setInProgress(false);
    });
    incompleteAlert();
  };

  const completeAlert = () =>
    Alert.alert(
      'Session Complete',
      'Congratulations, you have been awarded cat cash for your hardwork!',
      [
        {
          text: 'Continue',
          onPress: () => setRefresh((x) => x + 1),
          style: 'cancel',
        },
      ]
    );

  const incompleteAlert = () =>
    Alert.alert(
      'Session Incomplete',
      'Complete session entirely to get cat cash.',
      [
        {
          text: 'Continue',
          onPress: () => setRefresh((x) => x + 1),
          style: 'cancel',
        },
      ]
    );

  // const toggleGroup = () => {
  //   setIsGroup(!isGroup);
  // };

  // let toggle;
  // if (inProgress) {
  //   toggle = <></>;
  // } else {
  //   toggle = (
  //     <Toggle checked={isGroup} onChange={toggleGroup} disabled={!isLoggedIn()}>
  //       {isGroup ? 'Group' : 'Solo'}
  //     </Toggle>
  //   );
  // }

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
  // if (isGroup && !inProgress) {
  //   button = (
  //     <ButtonGroup>
  //       <Button style={styles.button} onPress={() => setChatVisible(true)}>
  //         Chat
  //       </Button>
  //       <StartStopButton
  //         progress={inProgress}
  //         style={styles.button}
  //         start={start}
  //         stop={stop}
  //       />
  //       <Button style={styles.button} onPress={() => setAddVisible(true)}>
  //         Add
  //       </Button>
  //     </ButtonGroup>
  //   );
  // } else {
  button = (
    <StartStopButton
      progress={inProgress}
      style={styles.button}
      start={start}
      stop={stop}
    />
  );
  // }

  return (
    <Layout style={styles.container}>
      <Text>{catCash + ' cat cash'}</Text>
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
      {/* {toggle} */}
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
