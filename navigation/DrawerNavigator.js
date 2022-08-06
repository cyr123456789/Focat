import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home/home';
import Leaderboard from '../screens/Leaderboard/leaderboard';
import Todo from '../screens/Todo/todo';
import Friends from '../screens/Friends/friends';
import DrawerContent from './DrawerContent';
import { default as theme } from '../assets/custom-theme.json';
import { getUsername } from '../utils/usernameStorage';

const Drawer = createDrawerNavigator();
const activeScreenColor = theme['color-primary-300'];

const DrawerNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  getUsername().then((value) => {
    if (value !== undefined) {
      setIsLoggedIn(true);
    }
  });
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
      <Drawer.Screen
        name="Todo"
        component={Todo}
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
      {isLoggedIn ? (
        <Drawer.Screen
          name="Friends"
          component={Friends}
          options={{
            drawerActiveTintColor: activeScreenColor,
          }}
        />
      ) : (
        <></>
      )}
      {isLoggedIn ? (
        <Drawer.Screen
          name="Top 100 Richest Users"
          component={Leaderboard}
          options={{
            drawerActiveTintColor: activeScreenColor,
            drawerLabel: 'Leaderboard',
          }}
        />
      ) : (
        <></>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
