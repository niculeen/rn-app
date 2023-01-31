import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gs from "../../styles"
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Toast from "react-native-simple-toast";
import Icon from '@svgr-iconkit/themify-icons/native';
// import { Badge } from 'react-native-paper';
import { Badge, Chip, Avatar } from '@react-native-material/core';
import { getUserById, updateAvatar, updateProfile } from "../../actions/app";

import TagInput from "../TagInput"

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const ProfileCard = props => {
    const data = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [wishlist, setWishlist] = useState(data.wishlist)
    const [fullName, setFullName] = useState(data.firstName + " " + data.lastName)
    const [isFullNameValid, setFullNameValid] = useState("")
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        if (!fullName) setFullNameValid("Full Name is required")
        else { setFullNameValid(""); }
    }, [fullName])
    const onSave = () => {
        console.log(fullName, wishlist)
        if (edit) {
            const [firstName, lastName] = fullName.split(" ")
            console.log(lastName)
            dispatch(updateProfile({ firstName, lastName, wishlist }, (res => {
                console.log(res)
                Toast.showWithGravity(res.message, Toast.SHORT, Toast.SHORT);
            })))
        }
        setEdit(!edit)
    }

    return (
        <View style={styles.container}>
            {/* <View style={[styles.avatarContainer]}>
                <Avatar style={[styles.avatar]}
                    label={data.firstName}
                    size={90}
                    imageStyle={{ borderWidth: 4, borderColor: "white" }}
                    icon={props => <Icon name="account" size={9} color="black" />}
                    image={Images.user_tab}
                />
                <Badge label={data.role.name} labelStyle={[s.textWhite, s.textSmall]}
                    style={[gs.bgRed, { marginRight: -10 }]}>
                </Badge>
            </View> */}
            <Icon name={edit ? `save` : `pencil`} size={20} onPress={onSave} color="black" style={{ alignSelf: "flex-end" }} />

            <View style={[s.mt4, s.w100, { alignItems: "center", justifyContent: "center" }]}>
                {edit ?
                    [<TextInput defaultValue={fullName}
                        style={[s.formControl, s.textCenter, s.isInvalid, s.lead, { textTransform: "capitalize", }]}
                        onChangeText={t => setFullName(t)}
                        key="name"
                    />,
                    <Text key="message" style={[s.textDanger, s.textSmall]}>{isFullNameValid}</Text>
                    ]
                    : <Text style={[s.lead, gs.textBold, { textTransform: "capitalize" }]}>{data.firstName} {data.lastName}</Text>
                }
            </View>
            <Text>{data.email}</Text>
            <Text style={gs.textLeft}>Wishlist:</Text>
            {
                edit ?
                    <TagInput onInput={tags => setWishlist(tags)} color="red" tags={wishlist} /> :
                    <View style={{ marginTop: 1, flexDirection: "row", flexWrap: "wrap" }}>
                        {wishlist.map((w, index) => <Chip label={w} key={index} color='red' style={{ margin: 2 }} labelStyle={[s.textSmall]}
                            trailing={<Icon name='close' size={8} color="grey" />} />)}
                    </View>
            }
            <View style={[s.mt3, { display: "flex", flexDirection: "row", justifyContent: "space-around" }]}>
                <TouchableOpacity
                    accessibilityRole="button"
                    activeOpacity={1}
                    style={[gs.bgFacebook, {
                        width: 33,
                        height: 33,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        marginRight: 5,
                        borderRadius: 15
                    }]}
                    onPress={() => {
                        // navigation.navigate(item.route);
                    }}>
                    <Icon name='instagram' size={18} color="white" />
                </TouchableOpacity>
                {/*  <TouchableOpacity
                    accessibilityRole="button"
                    activeOpacity={1}
                    style={[gs.bgPinterest, {
                        width: 33,
                        height: 33,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 15,
                        marginRight: 5,
                    }]}
                    onPress={() => {
                        // navigation.navigate(item.route);
                    }}>
                    <Icon name='pinterest' size={14} color="white" />
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                    accessibilityRole="button"
                    activeOpacity={1}
                    style={[gs.bgRed, {
                        height: 33,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 9,
                        paddingHorizontal: 20,
                        borderRadius: 15
                    }]}
                    onPress={() => {
                        // navigation.navigate(item.route);
                    }}>
                    <Text style={[s.textWhite, gs.textBold, { fontSize: 10, letterSpacing: 1 }]}>FOLLOW</Text>
                </TouchableOpacity> */}
            </View>
        </View >
    );
};

export default ProfileCard;

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        backgroundColor: "#ffffff",
        display: "flex",
        borderRadius: 10,
        // flex: 1,
        // paddingTop: 20,
        // paddingLeft: 20,
        // paddingBottom: 20,
        padding: 20,
        width: "92%",
        left: "4%",
        // bottom: -45,
        // marginTop: "60%",
        // zIndex: 2,
        // marginLeft: 0,
        // textAlign: "center",
        // justifyContent: "center",
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        alignItems: "center",
        elevation: 5,
    },
    avatarContainer: {
        backgroundColor: "transparent",
        alignItems: "flex-end",
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        top: -45,
    },
    avatar: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: -20
    },
});
