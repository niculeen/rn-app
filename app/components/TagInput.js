/* eslint-disable react/self-closing-comp */
import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import Tags from 'react-native-tags';
import { Badge, Chip, Avatar } from '@react-native-material/core';
import Icon from "@svgr-iconkit/themify-icons/native"
import gs from "../styles";
const TagInput = (props) => {
    const [tags, setTags] = useState(props.tags)
    useEffect(() => {
        if (typeof props.onInput == "function") {
            props.onInput(tags)
        }
    }, [tags])
    return (
        <Tags
            initialText=""
            textInputProps={{
                placeholder: props.placeholder || "",
                placeholderTextColor: '#777',
            }}
            style={[gs.formInput]} 
            initialTags={tags}
            onChangeTags={tags => {
                setTags(tags);
            }}
            onTagPress={(index, tagLabel, event, deleted) => {
                setTags(tags.filter((tag, i) => i !== index));
            }}
            containerStyle={{
                backgroundColor: 'transparent',
                borderTopWidth: 0.5,
            }}
            tagContainerStyle={{
                backgroundColor: "transparent"
            }}
            inputContainerStyle={{
                backgroundColor: "transparent"

            }}
            inputStyle={{
                backgroundColor: 'transparent',
                borderRadius: 8,
                placeholderTextColor: '#262626',
            }}
            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                <Chip label={tag}
                    key={`${tag}-${index}`}
                    onPress={onPress} color={props.color} trailing={<Icon name='close' size={8} color="grey" />} />
            )}
        />);
}

export default TagInput