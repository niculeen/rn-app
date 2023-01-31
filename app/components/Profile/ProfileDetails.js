import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Images, Fonts } from '@assets';
import { imageUrl } from '@constants';
import style from "../../styles/index.scss"
import gs from "../../styles"
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Icon from '@svgr-iconkit/themify-icons/native';

import { updateProfile } from "../../actions/app";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const ProfileDetails = props => {

    const data = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [bio, setBio] = useState(data.bio)
    const onSave = () => {
        dispatch(updateProfile({ bio }, res => {
            setEdit(!edit)
        }))
    }
    return (
        <View style={styles.container}>

            <View>
                <Text style={[s.lead, gs.textBold]}>About me</Text>
                <Icon name={edit ? `save` : `pencil`} size={20} onPress={onSave} color="black" style={{ alignSelf: "flex-end" }} />
            </View>
            <View style={[s.mt2]}>
                {edit ? <TextInput defaultValue={bio} multiline={true} numberOfLines={3}
                    style={[s.formControl, s.isInvalid, s.lead, {justifyContent:"flex-start", alignItems:"flex-start", alignContent:"flex-start",height:"auto" }]}
                    onChangeText={t => setBio(t)}
                    key="name"
                /> : <Text>{data.bio}</Text>}
            </View>
            <Text style={[s.lead, gs.textBold, s.mt4]}>Photos</Text>
            <View style={[s.mt3, { flexDirection: "row" }]}>
                <View style={[styles.photoContainer]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
                <View style={[styles.photoContainer]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
                <View style={[styles.photoContainer]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
                <View style={[styles.photoContainer, s.pr0]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
                <View style={[styles.photoContainer]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
                <View style={[styles.photoContainer]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
                <View style={[styles.photoContainer]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
                <View style={[styles.photoContainer, s.pr0]}>
                    <Image resizeMode="contain" style={[styles.photo]} source={{ uri: "https://via.placeholder.com/190x150" }} />
                </View>
            </View>
        </View>
    );
};

export default ProfileDetails;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        // borderRadius: 10,
        padding: "4%",
        width: "100%",
        alignSelf: "center",
        marginTop: 20,
        elevation: 5
    },
    photoContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingRight: 5,

    },
    photo: {
        borderRadius: 10,
        width: "100%",
        height: 59,

    },
    listValue: {
        fontSize: 28,
        fontWeight: "700",
        fontFamily: "Montserrat",
        marginTop: 2
    },
    listText: {
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#999",
        fontSize: 10
    }
});
