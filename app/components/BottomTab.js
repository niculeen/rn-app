import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Images } from '@assets/images';
import Icon from '@svgr-iconkit/themify-icons/native';
import style from "../styles/index.scss"

import BootstrapStyleSheet from "react-native-bootstrap-styles";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


export default ({ navigation }) => {
  const TabArr = [
    {
      route: 'Search',
      id: 1,
      label: 'Home',
      name: 'Search',
      icon: "search",
    },
    {
      route: 'Profile',
      id: 2,
      name: 'user',
      label: 'User',
      icon: "user",
    },
    {
      route: 'Home',
      id: 3,
      name: 'favorites',
      label: 'Favorites',
      icon: "plus",
    },
    {
      route: 'Comments',
      label: 'Comments',
      id: 4,
      name: 'comments',
      icon: "comments"
    },
    {
      route: 'Settings',
      id: 5,
      label: 'settings',
      name: 'Settings',
      icon: "package",
      component: null,
    },
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        shadowOffset: { width: 10, height: -10 },
        shadowColor: '#171717',
        shadowRadius: 3,
        shadowOpacity: 1,
        elevation: 25,
      }}>
      {TabArr.map((item, index) => {
        return (item.icon == "plus" ? <TouchableOpacity
          accessibilityRole="button"
          key={index}
          activeOpacity={1}
          style={[style.bgRed, {
            width: 55,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 100,
            marginTop: -55
          }]}
          onPress={() => {
            navigation.navigate(item.route);
          }}>
          <Icon
            name={item.icon}
            size={30}
            color="white"
          />
        </TouchableOpacity> : <TouchableOpacity
          accessibilityRole="button"
          key={index}
          activeOpacity={1}
          style={{
            width: 25,
            height: 25,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
          onPress={() => {
            navigation.navigate(item.route);
          }}>
          <Icon name={item.icon} color="black" size={25} />
        </TouchableOpacity>
        );
      })}
    </View >
  );
};
