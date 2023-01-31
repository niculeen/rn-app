import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Images, Fonts } from '@assets';
import { imageUrl } from '@constants';
import style from "../../styles/index.scss"
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Icon from '@svgr-iconkit/themify-icons/native';


const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const ProfileStat = props => {
    let url = props.url;
    return (
        <View style={styles.container}>
            <View style={[styles.list]}>
                <Icon name='layout-grid2' size={16} color="#ddd" />
                <Text style={[styles.listValue]}>76</Text>
                <Text style={[styles.listText]}>POSTS</Text>
            </View>
            <View style={[styles.list]}>
                <Icon name='user' size={16} color="#ddd" />
                <Text style={[styles.listValue]}>22</Text>
                <Text style={[styles.listText]}>FOLLOWER</Text>
            </View>
            <View style={[styles.list]}>
                <Icon name='comments' size={16} color="#ddd" />
                <Text style={[styles.listValue]}>166</Text>
                <Text style={[styles.listText]}>COMMENTS</Text>
            </View>
            <View style={[styles.list]}>
                <Icon name='heart' size={16} color="#ddd" />
                <Text style={[styles.listValue]}>1.2k</Text>
                <Text style={[styles.listText]}>LIKES</Text>
            </View>
        </View>
    );
};

export default ProfileStat;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        width: "92%",
        alignSelf: "center",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        marginTop: 70
    },
    list: {
        justifyContent: "center",
        alignItems: "center",
        width: "23%",

    },
    listValue: {
        fontSize: 28,
        fontWeight: "700",
        fontFamily: "Montserrat",
        marginTop:2
    },
    listText: {
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#999",
        fontSize: 10
    }
});
