import React from 'react';
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

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Timeline" component={Timeline} />
      <Drawer.Screen name="Todo" component={Todo} />
      <Drawer.Screen name="Achievements" component={Achievements} />
      <Drawer.Screen name="Friends" component={Friends} />
      <Drawer.Screen name="Store" component={Store} />
      <Drawer.Screen name="Settings" component={Settings} />
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
