import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home/home';
import Settings from '../screens/Settings/settings';
import Leaderboard from '../screens/Leaderboard/leaderboard';
import Todo from '../screens/Todo/todo';
import Friends from '../screens/Friends/friends';
import DrawerContent from './DrawerContent';
import Profile from '../screens/Profile/profile';
import { default as theme } from '../custom-theme.json';
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
      <Drawer.Screen 
        name="Leaderboard" 
        component={Leaderboard} 
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
