/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import gs, { colors } from "../../styles";
import { Images, Fonts } from "@assets";
import { signup, optConfirm } from "@actions";
import TagInput from "@components/TagInput"
import Toast from "react-native-simple-toast";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
// import {TextInput} from '@react-native-material/core';
import SelectDropdown from "react-native-select-dropdown";
import { useSelector, useDispatch } from "react-redux";

import BootstrapStyleSheet from "react-native-bootstrap-styles";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const radioButtonData = [
  {
    label: "Gifter",
    id: "gifter",
    labelStyle: { color: colors.primary, fontSize: Fonts.defaultFontSize },
    color: colors.primary,
  },
  {
    label: "Cutie",
    labelStyle: { color: colors.primary, fontSize: Fonts.defaultFontSize },
    id: "cutie",
    color: colors.primary,
  },
];

const signingRadioButtonData = [
  {
    id: "11",
    label:
      "By clicking Sign Up, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.",
    value: "policy",
    labelStyle: {
      color: "#fff",
      fontSize: Fonts.defaultFontSize,
      paddingRight: 20,
      lineHeight: 16,
    },
    color: "#fff",
  },
];

const MM = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// const YY = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
const _gender = ["male", "female"];

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [radioButtons, setRadioButtons] = useState(radioButtonData);
  const [signingRadioButtons, setSigningRadioButtons] = useState(
    signingRadioButtonData
  );
  const [DD, setDD] = useState([]);
  const [YY, setYY] = useState([]);

  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [wishlist, setWishlist] = useState([]);

  const [errorRole, setErrorRole] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorSecondeName, setErrorSecondName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  function validation() {
    var roleValid = false;
    if (role === "") {
      setErrorRole("Please select user type");
    } else {
      setErrorRole("");
      roleValid = true;
    }

    var firstNameValid = false;
    if (firstName.length === 0) {
      setErrorFirstName("First Name is required");
    } else if (firstName.length < 3) {
      setErrorFirstName("First Name should be minimum 3 characters");
    } else if (firstName.indexOf(" ") >= 0) {
      setErrorFirstName("First Name cannot contain spaces");
    } else {
      setErrorFirstName("");
      firstNameValid = true;
    }

    var lastNameValid = false;
    if (lastName.length === 0) {
      setErrorSecondName("Last Name is required");
    } else if (lastName.length < 3) {
      setErrorSecondName("Last Name should be minimum 3 characters");
    } else if (lastName.indexOf(" ") >= 0) {
      setErrorSecondName("Last Name cannot contain spaces");
    } else {
      setErrorSecondName("");
      lastNameValid = true;
    }

    var emailValid = false;
    if (email.length === 0) {
      setErrorEmail("Email is required");
    } else if (email.length < 6) {
      // setErrorEmail('Email should be minimum 6 characters');
    } else if (email.indexOf(" ") >= 0) {
      setErrorEmail("Email cannot contain spaces");
    } else if (emailReg.test(email) === false) {
      console.log("email format error");
      setErrorEmail("Email format is not correct");
    } else {
      setErrorEmail("");
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setErrorPassword("Password is required");
    } else if (password.length < 6) {
      setErrorPassword("Password should be minimum 6 characters");
    } else {
      setErrorPassword("");
      passwordValid = true;
    }

    var confirmPasswordValid = false;
    if (confirmPassword.length === 0) {
      setErrorConfirmPassword("Password is required");
    } else if (confirmPassword.length < 6) {
      setErrorConfirmPassword("Password should be minimum 6 characters");
    } else if (confirmPassword !== password) {
      setErrorConfirmPassword("Password is not matched");
    } else {
      setErrorConfirmPassword("");
      confirmPasswordValid = true;
    }


    // var birthValid = false;
    // if (birthDD === "" || birthMM === "" || birthYY === "") {
    //   setErrorBirth("Please select birthday");
    // } else {
    //   setErrorBirth("");
    //   birthValid = true;
    // }

    // var genderValid = false;
    // if (gender === "") {
    //   setErrorGender("Please select gender");
    // } else {
    //   setErrorGender("");
    //   genderValid = true;
    // }

    if (
      roleValid &&
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      return true;
    } else {
      return false;
    }
  }

  function onPressAccountTypeRadioButton(radioButtonArray) {
    radioButtonArray.map((item) => {
      if (item.selected) {
        setRole(item.id);
      }
    });
    setRadioButtons(radioButtonArray);
  }

  function onPressSigningRadioButton(radioButtonArray) {
    radioButtonArray.map((item) => {
      if (item.selected) {
        setSigning(true);
      } else {
        setSigning(false);
      }
    });
    setSigningRadioButtons(radioButtonArray);
  }

  const gotoSignIn = () => {
    navigation.replace("SignIn");
  };

  const onSignUp = () => {
    if (validation()) {
      dispatch(
        signup(
          {
            email,
            password,
            role,
            firstName,
            lastName,
            wishlist
          },
          (res) => {
            if (res && res.data) {
              var data = res.data;
              if (!data.error) {
                Toast.showWithGravity(
                  data.message,
                  Toast.SHORT,
                  Toast.TOP
                );

                navigation.navigate("SignIn");
                return;
                dispatch(
                  optConfirm(email, (res) => {
                    console.log("optConfirm: ", res);
                    if (res && res.data) {
                      var data = res.data;
                      if (data.error) {
                        Toast.showWithGravity(
                          data.mmessage || "Send failed!",
                          Toast.SHORT,
                          Toast.TOP
                        );
                      } else {
                        Toast.showWithGravity(
                          "Sent OTP code Successfully. Please check your email!",
                          Toast.SHORT,
                          Toast.TOP
                        );
                        navigation.navigate("Otp", "SignIn");
                      }
                    }
                  })
                );
              } else {
                Toast.showWithGravity(
                  data.message || "SignUp failed",
                  Toast.SHORT,
                  Toast.TOP
                );
              }
            }
          }
        )
      );
    }
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
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[gs.container]}>
            <View style={[gs.container]}>
              <Image
                source={Images.privy.logo_small}
                style={[gs.loginFormLogo]}
              />
            </View>
            <View>
              <ScrollView>
                <View style={[gs.loginForm]}>
                  <Text
                    style={[
                      gs.textLeft,
                      gs.formLabel
                    ]}
                  >
                    Account Type
                  </Text>
                  <RadioGroup
                    layout="row"
                    radioButtons={radioButtons}
                    onPress={onPressAccountTypeRadioButton}
                    containerStyle={{
                      alignSelf: "flex-start",
                      paddingTop: 15,
                    }}
                  />
                  {errorRole.length > 0 && (
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorRole}
                    </Text>
                  )}
                  <Text style={[gs.formLabel]}>First Name</Text>
                  <TextInput
                    // placeholder="First Name"
                    // placeholderTextColor={colors.light}
                    style={[s.formControl, gs.formInput]}
                    onChangeText={(e) => setFirstName(e)}
                    value={firstName}
                  />
                  {errorFirstName.length > 0 && (
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorFirstName}
                    </Text>
                  )}

                  <Text style={[gs.formLabel]}>Last Name</Text>
                  <TextInput
                    // placeholder="Last Name"
                    // placeholderTextColor={colors.light}
                    style={[s.formControl, gs.formInput]}
                    onChangeText={(e) => setLastName(e)}
                    value={lastName}
                  />
                  {errorSecondeName.length > 0 && (
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorSecondeName}
                    </Text>
                  )}
                  <Text style={[gs.formLabel]}>Email</Text>
                  <TextInput
                    // placeholder="Email"
                    // placeholderTextColor={colors.light}
                    style={[s.formControl, gs.formInput]}
                    onChangeText={(e) => setEmail(e)}
                    value={email}
                  />
                  {errorEmail.length > 0 && (
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorEmail}
                    </Text>
                  )}

                  <Text style={[gs.formLabel]}>Password</Text>
                  <TextInput
                    secureTextEntry={true}
                    // placeholder="Password"
                    // placeholderTextColor={colors.light}
                    style={[s.formControl, gs.formInput]}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                  />
                  {errorPassword.length > 0 && (
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorPassword}
                    </Text>
                  )}

                  <Text style={[gs.formLabel]}>Confirm Password</Text>
                  <TextInput
                    secureTextEntry={true}
                    // placeholder="Confirm Password"
                    // placeholderTextColor={colors.light}
                    style={[s.formControl, gs.formInput]}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                  />
                  {errorConfirmPassword.length > 0 && (
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorConfirmPassword}
                    </Text>
                  )}
                  <Text style={[gs.formLabel]}>Wishlist</Text>

                  <TagInput onInput={setWishlist} />
                  {/* <Text
                    style={[
                      styles.text,
                      styles.text_align_left,
                      styles.text_color_white,
                      styles.text_bold,
                    ]}
                  >
                    Date of Birthday
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-around",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <SelectDropdown
                      buttonStyle={styles.select}
                      buttonTextStyle={styles.text_color_white}
                      defaultButtonText={"MM"}
                      // defaultValueByIndex={0}
                      data={MM}
                      onSelect={(selectedItem, index) => {
                        setBirthMM(index + 1);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                    <SelectDropdown
                      buttonStyle={styles.select}
                      buttonTextStyle={styles.text_color_white}
                      defaultButtonText={"DD"}
                      defaultValueByIndex={0}
                      data={DD}
                      onSelect={(selectedItem, index) => {
                        setBirthDD(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                    <SelectDropdown
                      buttonStyle={styles.select}
                      buttonTextStyle={styles.text_color_white}
                      defaultValueByIndex={0}
                      defaultButtonText={"YY"}
                      data={YY}
                      onSelect={(selectedItem, index) => {
                        setBirthYY(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View>
                  {errorBirth.length > 0 && (
                    
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorBirth}
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.text,
                      styles.text_align_left,
                      styles.text_color_white,
                      styles.text_bold,
                    ]}
                  >
                    Gender
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <SelectDropdown
                      buttonStyle={styles.select}
                      buttonTextStyle={styles.text_color_white}
                      searchPlaceHolder={"Gender"}
                      defaultButtonText={"Gender"}
                      // defaultValueByIndex={0}
                      data={_gender}
                      onSelect={(selectedItem, index) => {
                        setGender(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View>
                  {errorGender.length > 0 && (
                    
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorGender}
                    </Text>
                  )}
                  <RadioGroup
                    layout="row"
                    containerStyle={{
                      alignSelf: "flex-start",
                      paddingTop: 15,
                      paddingRight: 15,
                    }}
                    radioButtons={signingRadioButtonData}
                    onPress={onPressSigningRadioButton}
                  />
                  {errorSigning.length > 0 && (
                    
                    <Text style={[s.textDanger, gs.textLeft]}>
                      {errorSigning}
                    </Text>
                  )} */}
                  <TouchableOpacity
                    style={[s.w100, s.btn, gs.btnPrimary, s.mt3, s.mb2]}
                    onPress={onSignUp}
                  >
                    <Text style={[s.textCenter, s.lead, gs.textBold, s.textWhite, s.p2]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <Text style={[s.textSmall, gs.formLabel, s.m2]}>
                      Do you have already an Account? &nbsp;
                      <Text
                        onPress={gotoSignIn}
                        style={[s.textPrimary, s.textSmall]}
                      >
                        Sign In
                      </Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
