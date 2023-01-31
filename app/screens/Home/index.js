import React, { useEffect } from "react";
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
  TextInput
} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Icon from '@svgr-iconkit/themify-icons/native';
import Toast from "react-native-simple-toast";
import { Images, FONT } from "@assets";
import gs, { colors } from "../../styles";
import { NewsFeed } from "../../components/Post";
import { useSelector } from "react-redux";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Home = ({ navigation }) => {
  const data = useSelector(state => state.auth.user)
  const gotoSignIn = () => {
    navigation.replace("SignIn");
  };
  const gotoSignUp = () => {
    navigation.replace("SignUp");
  };
  return (

    <ScrollView>
      <Header data={data} />
      <View style={[styles.header]}>
        <Text style={[{ fontSize: 30, fontWeight: "700" }]}>Stories</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={[gs.textRed]}>View All</Text>
      </View>

      <ScrollView horizontal={true}>
        <View>
          {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
        </View>
      </ScrollView>
      <SafeAreaView style={[styles.container]}>
        <NewsFeed />
        <NewsFeed />
        <NewsFeed />
        <NewsFeed />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;


export const Header = (props) => {
  return <View style={{ padding: 10, backgroundColor: "white", flexDirection: "row" }}>
    <View style={[styles.headerForm]}>
      <TextInput style={[s.formControl, styles.headerInput]}></TextInput>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={1}
        style={{
          marginLeft: -40,
          lineHeight: 42,
          height: 42,
          padding: 14,
        }}
        onPress={() => {
          Toast.showWithGravity("Search", Toast.LONG, Toast.TOP)
        }}>
        <Icon name="search" size={14} color="black" />
      </TouchableOpacity>
    </View>
    <View style={{ margin: "auto", width: "15%" }}>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={1}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%"
        }}
        onPress={() => {
        }}>
        <Image source={{ uri: props.data.avatar }} style={{
          width: 40,
          height: 40,
          backgroundColor: "grey",
          borderRadius: 20
        }} />
      </TouchableOpacity>
    </View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white"
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
  header: {
    padding: "4%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  headerForm: {
    position: "relative",
    width: "85%",
    display: "flex",
    flexDirection: "row"
  },
  headerInput: {
    borderRadius: 10,
    lineHeight: 42,
    height: 42,
    padding: 20,
    fontSize: 13,
    color: "#999",
    backgroundColor: "#f7f5f5"
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
