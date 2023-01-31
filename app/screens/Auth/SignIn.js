/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import Toast from "react-native-simple-toast";
import React, { useEffect, useState } from "react";
import gs from "../../styles";
import { Images } from "@assets";
import { login } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { IconX } from "../../Icons";
import { forgotPassword } from "../../actions";

import BootstrapStyleSheet from "react-native-bootstrap-styles";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const SignIn = ({ navigation }, props) => {
  const dispatch = useDispatch();
  const { user, login_state } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("12345678");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      // console.log('Singin: ', user);
    }
  }, [user]);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const validation = () => {
    var emailValid = false;
    if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      // setEmailError('Email should be minimum 6 characters');
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else if (reg.test(email) === false) {
      console.log("email format error");
      setEmailError("Email format is not correct");
    } else {
      setEmailError("");
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError("Password is required");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }
    if (emailValid && passwordValid) {
      // alert('Email: ' + email + '\nPassword: ' + password);
      setEmail("");
      setPassword("");
      return true;
    } else {
      return false;
    }
  };
  const onSignIn = async () => {
    if (validation()) {
      dispatch(
        login(email, password, (data) => {
          if (!data.error) {
            Toast.showWithGravity(
              data.msg || "Login Success!",
              Toast.SHORT,
              Toast.TOP
            );
            navigation.navigate("MainApp");
            return;
            dispatch(
              forgotPassword(email, (res) => {
                // console.log('forgotPasswordOne: ', res.data);
                if (res && res.data) {
                  var data = res.data;
                  if (data.error) {
                    Toast.showWithGravity(
                      data.msg || "Send failed!",
                      Toast.SHORT,
                      Toast.TOP
                    );
                  } else {
                    Toast.showWithGravity(
                      "Sent Successfully. Please check your email!",
                      Toast.SHORT,
                      Toast.TOP
                    );
                    navigation.navigate("Otp", "MainApp");
                    // navigation.navigate('Otp', {email});
                  }
                }
              })
            );
          } else {
            Toast.showWithGravity(
              data.msg || "Login failed",
              Toast.SHORT,
              Toast.TOP
            );
          }
        })
      );
    }
  };
  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  const gotoForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={Images.privy.background1}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center"
        }}
        onPress={(e) => navigation.replace("Auth")}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[gs.container]}>
            <View style={[gs.container]}>
              <Image
                source={Images.privy.logo_small}
                style={[gs.loginFormLogo]}
              />
            </View>
            <View style={[gs.loginForm]}>

              <Text style={[gs.formLabel]}>Email</Text>
              <TextInput
                style={[s.formControl, gs.formInput]}
                onChangeText={(e) => setEmail(e)}
                value={email}
              />
              {emailError.length > 0 && (
                <Text style={[s.textDanger, gs.textLeft]}>{emailError}</Text>
              )}
              <Text style={[gs.formLabel]}>Password</Text>
              <TextInput
                style={[s.formControl, gs.formInput]}
                secureTextEntry={true}
                onChangeText={(e) => setPassword(e)}
                value={password}
              />
              {passwordError.length > 0 && (
                <Text style={[s.textDanger, gs.textLeft]}>
                  {passwordError}
                </Text>
              )}
              <Text
                style={[s.textSmall, s.textPrimary, gs.textLeft, s.mb4]}
                onPress={gotoForgotPassword}
              >
                Forgot password?
              </Text>
              <TouchableOpacity
                style={[s.w100, s.btn, gs.bgRed, s.mb2]}
                onPress={onSignIn}
              >
                <Text style={[s.textCenter, s.textWhite, s.lead, gs.textBold, s.p2]}>Sign In</Text>
              </TouchableOpacity>
              <View>
                <Text style={[s.textSmall, gs.formLabel, s.m2]}>
                  Don't have an Account &nbsp;
                  <Text
                    onPress={gotoSignUp}
                    style={[gs.textLeft, s.textPrimary]}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={[s.w100, s.btn, gs.bgOrange, s.mt3, gs.textLeft]}
                onPress={onSignIn}
              >
                <IconX
                  origin="FONTAWESOME"
                  name="google"
                  size={20}
                  color="white"
                  style={{ position: "absolute", left: 30 }}
                />
                <Text style={[s.textWhite, s.textCenter, s.p2]}>
                  Connect with <Text style={[s.lead, gs.textBold]}>Google</Text>
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[s.w100, s.btn, gs.bgBlue, s.mt3]}
                onPress={onSignIn}
              >
                <Text style={[s.h5, s.textCenter, s.textWhite, s.p2]}>
                  Connect with Facebook
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
