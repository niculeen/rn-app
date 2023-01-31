import { StyleSheet, View,  ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { Images } from "@assets";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("SignIn");
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.privy.logo_small}
        resizeMode="contain"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
