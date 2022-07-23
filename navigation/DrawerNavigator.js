import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home/home';
import Settings from '../screens/Settings/settings';
import Leaderboard from '../screens/Leaderboard/leaderboard';
import Todo from '../screens/Todo/todo';
import Friends from '../screens/Friends/friends';
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
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
      <Drawer.Screen name="Todo" component={Todo} />
      <Drawer.Screen name="Friends" component={Friends} />
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
