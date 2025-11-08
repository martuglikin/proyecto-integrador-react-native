import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NuevoPost from '../screens/NuevoPost';
import NavHomeComment from './NavHomeComment';

const Tab = createBottomTabNavigator();

function HomeMenu() {

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="NavHomeComment"
        component={NavHomeComment}
        options={{ headerShown: false, 
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo post"
        component={NuevoPost}
        options={{ headerShown: false,
            tabBarIcon: ({ size, color }) => <FontAwesome name="plus-square" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;
