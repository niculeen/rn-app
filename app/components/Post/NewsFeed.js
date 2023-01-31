import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Images } from '@assets/images';
import { imageUrl } from '@constants';
import style from "../../styles/index.scss"
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Icon from '@svgr-iconkit/themify-icons/native';


const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const NewsFeed = props => {
    let url = props.url;
    return (
        <View style={styles.container}>
            <View style={[styles.header, s.mb3]}>
                <View style={[styles.title]}>
                    <Image source={Images.default_user} style={[styles.avatar]} />
                    <Text style={[s.ml2, s.lead, style.textBold, { flex: 1 }]}>Edword Kelly
                        <View>
                            <Text>
                                2 hours ago
                            </Text>
                        </View>
                    </Text>
                </View>
                <View style={[styles.title, s.textRight]}>
                    <View style={{ flex: 1 }}></View>
                    <Icon name='more' color="black" rotation={90} size={16} />
                </View>
            </View>
            <View style={[styles.content]}>
                <Text style={[s.mb3]}>Implementation of technologies to store unchangeable data based on specific.</Text>
                <Image source={{ uri: "https://via.placeholder.com/500x300" }} resizeMode="contain"
                    style={{ width: "100%", height: 200 }} />
            </View>
            <View style={[styles.footer, s.mt3]}>
                <View style={[styles.footerItem]}>
                    <Icon name='heart' color='red' size={18} />
                    <Text style={[s.ml2]}>
                        1124
                    </Text>
                </View>
                <View style={[styles.footerItem]}>
                    <Icon name='comment-alt' color='black' size={18} />
                    <Text style={[s.ml2]}>
                        77
                    </Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={[styles.footerItem, s.mr0]}>
                    <Icon name='announcement' color='black' size={18} />
                    <Text style={[s.ml2]}>
                        23
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NewsFeed;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        display: "flex",
        borderRadius: 10,
        flex: 1,
        padding: 20,
        width: "92%",
        left: "4%",
        marginTop: 20,
        elevation: 5,
    },
    header: {
        flexDirection: "row"
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "white",
        overflow: "hidden",

        // justifyContent: "center",
        // alignSelf: "center",
        borderWidth: 4,
        borderColor: "#fff",
    },
    title: {
        // textAlign: "center",
        // justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: "row"
    },
    content: {
    },
    footer: {
        padding: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    footerItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    }
});
