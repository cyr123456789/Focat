import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Toggle } from '@ui-kitten/components';
import AccountModal from './account_modal';
import ThemesModal from './themes_modal';
import RemindersModal from './reminders_modal';

const Settings = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [notifications, setNotifications] = useState({
    enabled: true,
    text: 'Enabled',
  });
  const [timerStopwatch, setTimerStopwatch] = useState({
    enabled: true,
    text: 'Timer',
  });

  const toggleNotifications = () => {
    if (notifications.enabled) {
      setNotifications({
        enabled: false,
        text: 'Disabled',
      });
    } else {
      setNotifications({
        enabled: true,
        text: 'Enabled',
      });
    }
  };

  const toggleTimerStopwatch = () => {
    if (timerStopwatch.enabled) {
      setTimerStopwatch({
        enabled: false,
        text: 'Stopwatch',
      });
    } else {
      setTimerStopwatch({
        enabled: true,
        text: 'Timer',
      });
    }
  };

  return (
    <Layout style={styles.container}>
      <AccountModal visible={showAccount} setVisible={setShowAccount} />
      <ThemesModal visible={showThemes} setVisible={setShowThemes} />
      <RemindersModal visible={showReminders} setVisible={setShowReminders} />
      <Layout style={styles.items}>
        <Button style={styles.button} onPress={() => setShowAccount(true)}>
          Account Settings
        </Button>
        <Button style={styles.button} onPress={() => setShowThemes(true)}>
          Themes
        </Button>
        <Button style={styles.button} onPress={() => setShowReminders(true)}>
          Reminders
        </Button>
        <Toggle
          style={styles.toggle}
          checked={notifications.enabled}
          onChange={toggleNotifications}
        >
          {'Notifications: ' + notifications.text}
        </Toggle>
        <Toggle
          style={styles.toggle}
          checked={timerStopwatch.enabled}
          onChange={toggleTimerStopwatch}
        >
          {'Default mode: ' + timerStopwatch.text}
        </Toggle>
      </Layout>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    width: '65%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    margin: 4,
  },
  toggle: {
    alignSelf: 'flex-start',
    margin: 4,
  },
});
