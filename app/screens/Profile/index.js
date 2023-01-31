import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { TextInput as NTextInput } from "react-native-paper";
import Tags from "react-native-tags";
import { Images } from "@assets/images";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { httpHeaders, imageUrl, accountUrl } from "@constants";
import { updateAvatar, updateProfile } from "../../actions/app";
import { ToastAndroid } from "react-native";
import gs, { colors } from "../../styles";
import { ProfileCard, ProfileStat, ProfileDetails } from "@components/Profile"
import Icon from "@svgr-iconkit/themify-icons/native"
// import { Button, Menu, Divider, Provider } from 'react-native-paper';
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { NewsFeed } from "../../components/Post";
import { Button, Badge, Chip, Avatar } from '@react-native-material/core';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Toast from "react-native-simple-toast";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const { width, height } = Dimensions.get("screen");

export default function ({ navigation }) {
  const userData = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [filePath, setFilePath] = useState({});
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [avatar, setAvatar] = useState(userData.avatar)
  const onlaunchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        //  alert(response.customButton);
      } else {
        const assets = response && response.assets ? response.assets : null;
        const file = assets && assets.length > 0 ? assets[0] : null;
        // const source = file && file.uri ? file.uri : null;
        // setAvatar(source);
        var formdata = new FormData();
        formdata.append("avatar", {
          name: file.fileName,
          type: file.type,
          uri:
            Platform.OS === "ios"
              ? file.uri.replace("file://", "")
              : file.uri,
        });
        // formdata.append("avatar", file, file.uri);
        formdata.append("dist", "avatars");
        formdata.append("old_file", avatar)
        dispatch(updateAvatar(formdata, (res) => {
          setAvatar(res.url)
          Toast.showWithGravity(
            res.message,
            Toast.SHORT,
            Toast.TOP
          );
        }))
      }
    });
  };


  return (
    <ScrollView>
      <Header visible={visible} setVisible={setVisible} />
      {/* <Text>{JSON.stringify(userData, null, 2)}</Text> */}
      <SafeAreaView style={[gs.container]}>
        <ImageBackground
          source={
            avatar
              ? {
                uri: avatar,
              }
              : Images.user_tab
          }
          resizeMode="cover"
          style={{
            height: 426,
            position: "relative",
            marginBottom: 60
          }}
        >
          <Button style={[ls.avatarContainer]}
            onPress={onlaunchCamera}
            variant="text"
            loading={true}
            pressableContainerStyle={{
              borderRadius: 45,
              width: 90,
              height: 95,
              justifyContent: "center",
              alignItems: "center"
            }}
            loadingIndicator={props => (
              [<Avatar style={[ls.avatar]}
                label={firstName}
                size={90}
                key="avatar"
                imageStyle={{ borderWidth: 4, borderColor: "white" }}
                icon={props => <Icon name="account" size={9} color="black" />}
                image={
                  avatar
                    ? {
                      uri: avatar,
                    }
                    : Images.default_user
                }
              />,
              <Badge key="badge" label={userData.role.name} labelStyle={[s.textWhite, s.textSmall]}
                style={[gs.bgRed, { marginTop: 5 }]}>
              </Badge>]
            )}
            loadingIndicatorPosition="overlay"
          />
          <ProfileCard />
        </ImageBackground>

        <ProfileStat />
        <ProfileDetails />
        {/* <NewsFeed /> */}
        <NewsFeed />
      </SafeAreaView>
    </ScrollView>
  );
}

export const Header = (props) => {

  const { visible, setVisible } = props

  const showMenu = () => setVisible(true);

  const hideMenu = () => setVisible(false);
  return <View style={[gs.profileHeaderContainer, { backgroundColor: "rgba(0,0,0,0.1)"/* , elevation:5 */ }]}>
    <TouchableOpacity style={{ justifyContent: "center", }}>
      <Icon name="arrow-left" size={20} color="white" />
    </TouchableOpacity>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={[s.lead, gs.textBold, s.textWhite]}>Profile</Text>
    </View>

    <TouchableOpacity
      style={{
        justifyContent: "center"
      }}>
      <Menu
        visible={visible}
        anchor={<Icon name="more-alt" rotation={90} size={20} onPress={showMenu} color="white" />}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu} ><Icon name="pencil-alt" color="black" size={12} /> Edit</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Back</MenuItem>
      </Menu>
    </TouchableOpacity >
  </View >
}

const ls = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
    // position: "absolute",
    // top: -45,
    zIndex: 111,
    padding: "4%",
    alignSelf: "center",
    marginTop: "60%",
    marginBottom: -65
  },
  avatar: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: -20
  },
})