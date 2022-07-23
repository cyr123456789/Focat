import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home/home';
import Settings from '../screens/Settings/settings';
import Dashboard from '../screens/Dashboard/dashboard';
import Timeline from '../screens/Timeline/timeline';
import Todo from '../screens/Todo/todo';
import Achievements from '../screens/Achievements/achievements';
import Friends from '../screens/Friends/friends';
import Store from '../screens/Store/store';
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
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
      <Drawer.Screen
        name="Timeline"
        component={Timeline}
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
      <Drawer.Screen
        name="Achievements"
        component={Achievements}
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
        name="Store"
        component={Store}
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerActiveTintColor: activeScreenColor,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
