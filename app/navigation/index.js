import React from 'react';
import { Text, View, Image } from 'react-native';
// import Loading from '@screens/Loading';
import Splash from '@screens/Splash';
// import Auth from '../screens/Auth/Auth';
import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ForgotPassword1 from '../screens/Auth/ForgotPassword1';
import ForgotPassword2 from '../screens/Auth/ForgotPassword2';
// import Setting from '../screens/Setting';
// import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
// import Profile from '../screens/Profile';
import Main from './mainStack';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '@actions';
import { Images } from '@assets';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const navigation = props => {
  const { auth } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Loading" component={Loading} /> */}
        <Stack.Screen name="Splash" component={Splash} />
        {/* <Stack.Screen name="Auth" component={Auth} /> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        {/* <Stack.Screen name="Setting" component={Setting} /> */}
        {/* <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} /> */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({ navigation, route }) => ({
            title: 'Forgot Password',
            headerTitle: 'Forgot Password',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Image source={Images.back}></Image>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="ForgotPassword1"
          component={ForgotPassword1}
          options={({ navigation, route }) => ({
            title: 'Enter OTP',
            headerTitle: 'Enter OTP',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Image source={Images.back}></Image>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="ForgotPassword2"
          component={ForgotPassword2}
          options={({ navigation, route }) => ({
            title: 'Enter New Password',
            headerTitle: 'Enter New Password',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword1')}>
                <Image source={Images.back}></Image>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="MainApp"
          component={Main}
        // options={({navigation, route}) =>
        //   route.name === 'HomeScreen'
        //     ? {headerShown: true}
        //     : {headerShown: false}
        // }
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = {
  getUser,
};
const MainNavigator = connect(mapStateToProps, mapDispatchToProps)(navigation);

export default MainNavigator;
