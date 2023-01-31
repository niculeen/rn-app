/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen, { Header as HomeScreenHeader } from '@screens/Home';
import ProfileScreen, { Header as ProfileHeader } from '@screens/Profile';
import SettingScreen, { Header as SettingHeader } from '@screens/Setting';
import BottomTab from '../../components/BottomTab';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('screen');

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

const screenArr = [
  {
    route: 'Home',
    component: HomeScreen,
    // header: ()=>""// HomeScreenHeader,
    headerShown: false
  },
  {
    route: 'Profile',
    component: ProfileScreen,
    header: ProfileHeader,
    headerShown: false
  },
  {
    route: "Settings",
    component: SettingScreen,
    header: SettingHeader,
    headerShown: true
  }
];

const BottomStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTab {...props} />}>
      {screenArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={({ navigation, route }) => ({
            headerShown: item.headerShown,
            header: item.header
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomStack;
