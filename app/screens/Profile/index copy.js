import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { TextInput as NTextInput } from "react-native-paper";
import Tags from "react-native-tags";
import { Images } from "@assets/images";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { httpHeaders, imageUrl, accountUrl } from "@constants";
import { getUserById } from "../../actions/app";
import { ToastAndroid } from "react-native";
import { LOGIN_SUCCESS } from "../../constants";
import styles, { colors } from "../../styles";
import style from "../../styles/index.scss";

import Icon from "@svgr-iconkit/themify-icons/native"

import BootstrapStyleSheet from "react-native-bootstrap-styles";


const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const { width, height } = Dimensions.get("screen");

function StyledInput({
  label,
  type,
  onChangeText,
  value,
  autoFocus,
  width,
  editable = false,
  multiline,
  numberOfLines,
  children,
}) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        {children ? (
          children
        ) : (
          <TextInput
            style={{ textAlignVertical: "top" }}
            autoFocus={autoFocus}
            textContentType={type}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            editable={editable}
            numberOfLines={numberOfLines}
          />
        )}
      </View>
    </View>
  );
}

export default function ({ navigation }) {
  const { id } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phone, setPhone] = useState("1234567890");
  const [location, setLocation] = useState("United State");
  const [filePath, setFilePath] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [tags, setTags] = useState([]);

  const MyTagInput = () => (
    <Tags
      initialText=""
      textInputProps={
        {
          // placeholder: "+ Add Tags",
          // placeholderTextColor: "#777",
        }
      }
      style={{ /* backgroundColor: "black", */ paddingVertical: 5 }}
      initialTags={tags}
      onChangeTags={(tags) => {
        setTags(tags);
      }}
      onTagPress={(index, tagLabel, event, deleted) => {
        setTags(tags.filter((tag, i) => i !== index));
      }}
      containerStyle={{
        backgroundColor: "#ffffff",
        // borderColor: "#646464",
        // borderTopWidth: 0.5,
      }}
      inputStyle={{
        backgroundColor: "#ffffff",
        // borderRadius: 8,
        // color: "#fff",
        // placeholderTextColor: "#262626",
      }}
      renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: "#e4e4e4",
            paddingVertical: 5,
            paddingHorizontal: 15,
          }}
          key={`${tag}-${index}`}
          onPress={onPress}
        >
          <Text>{tag} &nbsp;x</Text>
        </TouchableOpacity>
      )}
    />
  );
  // useEffect(() => {
  //   dispatch(
  //     getUserById(id, (res) => {
  //       console.log("user===>>>", JSON.stringify(res.data, null, 4));
  //       const data = res.data[0];
  //       // console.log('user data : ', data);
  //       setEmail(data.email);
  //       setPhone(data.phone);
  //       // setLocation(data.location);
  //       // setFirstName(data.firstName);
  //       // setLastName(data.lastName);
  //       setProfilePic(data.profile_pic);
  //     })
  //   );
  // }, []);

  const onlaunchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

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
        const source = file && file.uri ? file.uri : null;
        setProfilePic(source);
        setFilePath(assets);
        console.log("response", JSON.stringify(response));
      }
    });
  };

  // const getUserData = async () => {
  //   const obj = ConvertToUrlForm({
  //     func: 'fetchUser',
  //     id: userId,
  //   });
  //   await fetch(accountUrl, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: obj,
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const data =
  //         responseData && responseData.data ? responseData.data[0] : null;
  //       if (responseData['error'] == false && data) {
  //         setUserData(data);
  //         signInWithEmailAndPassword(auth, data.email, data.email).catch(
  //           error => {
  //             const errorMessage = error.message;
  //             alert(errorMessage);
  //           },
  //         );

  //         auth.currentUser.updateProfile({
  //           displayName: fname + ' ' + lname,
  //         });
  //       }
  //       return responseData?.data;
  //     })
  //     .catch(err => {
  //       console.log('catch', err);
  //     });
  // };

  const onSave = () => {
    setIsLoading(true);
    var formdata = new FormData();
    formdata.append("func", "update_profile");
    formdata.append("email", email);
    // formdata.append('firstName', firstName);
    // formdata.append('lastName', lastName);
    formdata.append("phone", phone);
    formdata.append("location", location);
    // formdata.append('gender', gender);
    // formdata.append('dob', dob);
    if (filePath && filePath.length > 0) {
      formdata.append("profile_pic", {
        name: filePath[0].fileName,
        type: filePath[0].type,
        uri:
          Platform.OS === "ios"
            ? filePath[0].uri.replace("file://", "")
            : filePath[0].uri,
      });
      formdata.append("profile_pic", filePath[0], filePath[0].uri);
    }

    var requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
      redirect: "follow",
    };

    fetch(accountUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        // if (result['error'] == false) {
        //   getUserData();
        //   Toast.show({
        //     type: 'success',
        //     text1: 'Profile updated successfully 👋.',
        //   });
        // } else {
        //   Toast.show({
        //     type: 'error',
        //     text1: result.msg,
        //     // text2: ''
        //   });
        // }
        // console.log('result===>>>', result);
        ToastAndroid.show(
          "Profile updated successfully 👋.",
          ToastAndroid.SHORT
        );
        dispatch(
          getUserById(id, (res) => {
            console.log(res.data.data);
          })
        );
      })
      .catch((error) => {
        setIsLoading(false);
        ToastAndroid.show("Request failed", ToastAndroid.SHORT);
        console.log("error===>>>", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={onlaunchCamera}>
            <Image
              source={
                profile_pic
                  ? {
                    uri: profile_pic,
                  }
                  : Images.default_user
              }
              style={{
                alignSelf: "center",
                width: 100,
                height: 100,
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: 50,
                aspectRatio: 1,
              }}
            />
            {/* <Image
              source={require("./i_online.png")}
              style={{ position: "absolute", bottom: 0, right: 0 }}
            /> */}
          </TouchableOpacity>
          <View style={{ marginLeft: 5 }}>
            <Text
              style={{
                color: colors.primary,
                alignSelf: "center",
                marginTop: 10,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {firstName + " " + lastName}
            </Text>
          </View>
        </View>

        <NTextInput mode="outlined" label={"First Name"} value={firstName} onChangeText={setFirstName}  />
        <NTextInput mode="outlined" label={"First Name"} value={firstName} onChangeText={setFirstName}  />
        <StyledInput
          label={"First Name"}
          editable={true}
          value={firstName}
          // type={'email'}
          onChangeText={(e) => setFirstName(e)}
          width={80}
        />

        <StyledInput
          label={"Last Name"}
          editable={true}
          value={lastName}
          // type={'email'}
          onChangeText={(e) => setLastName(e)}
          width={80}
        />
        <StyledInput
          label={"Bio"}
          editable={true}
          value={bio}
          multiline={true}
          numberOfLines={3}
          // type={'location'}
          onChangeText={(e) => setBio(e)}
          width={80}
        />
        <StyledInput
          label={"Email"}
          editable={true}
          value={email}
          // type={'email'}
          onChangeText={(e) => setEmail(e)}
          width={80}
        />
        <StyledInput
          label={"Phone Number"}
          editable={true}
          value={phone}
          // type={'telephoneNumber'}
          onChangeText={(e) => setPhone(e)}
          width={80}
        />
        <StyledInput
          label={"Address"}
          editable={true}
          value={location}
          // type={'location'}
          onChangeText={(e) => setLocation(e)}
          width={80}
        />
        <StyledInput
          label={"Wishlist"}
          editable={true}
          value={location}
          // type={'location'}
          onChangeText={(e) => setLocation(e)}
          width={80}
        >
          <MyTagInput />
        </StyledInput>

        <TouchableOpacity onPress={() => (isLoading ? null : onSave())}>
          <View
            style={{
              backgroundColor: "#1455F5",
              borderRadius: 51,
              marginTop: 20,
              marginHorizontal: 10,
              marginBottom: 70,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {isLoading && <ActivityIndicator size="small" color="yellow" />}
            <Text
              style={{
                color: "white",
                fontSize: 18,
                alignSelf: "center",
                paddingVertical: 10,
              }}
            >
              {isLoading ? "Loading" : "Update Profile"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export const Header = (props) => {
  return <View style={[styles.headerContainer, s.bgWhite]}>
    <TouchableOpacity style={{ justifyContent: "center", }}>
      <Icon name="arrow-left" size={20} color="black" />
    </TouchableOpacity>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={[s.lead, s.bgWhite, style.textBold]}>Profile</Text>
    </View>

    <TouchableOpacity
      style={{
        justifyContent: "center",
      }}>
      <Icon name="more-alt" rotation={90} size={20} color="black" />
    </TouchableOpacity>
  </View>
}