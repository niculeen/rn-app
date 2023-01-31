import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { Images, FONT } from "@assets";
import { colors } from "../../styles";

const Auth = ({ navigation }) => {
  const gotoSignIn = () => {
    navigation.replace("SignIn");
  };
  const gotoSignUp = () => {
    navigation.replace("SignUp");
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={Images.privy.background1}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}></View>
        <View style={styles.mainContainer}>
        <Image source={Images.privy.logo_small} style={{width:100, height:40, marginBottom: 10 }} />
          <TouchableOpacity
            style={[styles.button, styles.active]}
            onPress={gotoSignIn}
          >
            <Text style={[styles.text, styles.text_color_white]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button1]} onPress={gotoSignUp}>
            {/* <Image source={Images.privy.icon} style={{width:40, height:40, marginRight: 10 }} /> */}
            <Text style={[styles.text, styles.text_color_black]}>Sign Up</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.button1]}>
            <Image source={Images.googleIcon} style={{ marginRight: 10 }} />
            <Text style={[styles.text, styles.text_color_black]}>
              Sign Up With Gmail
            </Text>
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={[styles.text, styles.text_small]}>
              By process you agree to the{" "}
              <Text
                style={{color:colors.primary}}
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                Privacy Policy
              </Text>
            </Text>

            <Text style={[styles.text, styles.text_small]}>
              and{" "}
              <Text
                style={{color:colors.primary}}
                onPress={() => navigation.navigate("TermsOfUse")}
              >
                Terms & Conditions
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  mainContainer: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.7)",
    width: "100%",
    justifyContent: "center",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
  image_banner: {
    resizeMode: "contain",
    width: "100%",
  },
  transparent: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  text: {
    alignItems: "center",
    fontSize: 18,
  },
  text_color_white: {
    color: "white",
  },
  text_color_black: {
    color: "black",
  },
  text_banner: {
    fontSize: 18,
    paddingBottom: 40,
  },
  text_small: {
    color: "gray",
    fontSize: 11,
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.light,
    width: "100%",
    height: 53,
    color: "white",
    padding: 12,
    marginBottom: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#005DE3",
    borderStyle: "solid",
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    height: 53,
    color: "black",
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#005DE3",
    borderStyle: "solid",
  },
  active: {
    backgroundColor: colors.bgPrimary,
  },
});
