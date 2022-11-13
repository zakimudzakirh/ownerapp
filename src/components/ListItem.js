import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { Colors, Fonts, Size } from '@styles/index';
import { ImageView } from './ImageView';

export const ListItem = ({ imageText, name, desc, usingFavorite, isFavorite, onFavorite, onPress }) => {
    return (
        <TouchableHighlight 
            underlayColor={"#ccc"}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.viewContainer}>
                {imageText && <ImageView 
                    style={{backgroundColor: Colors.black, borderColor: Colors.black}}
                    textStyle={{color: Colors.white}}
                    text={imageText}
                />}
                <View style={styles.nameContainer}>
                    <Text allowFontScaling={false} style={styles.name} numberOfLines={1}>{name}</Text>
                    {desc && <Text allowFontScaling={false} style={styles.desc} numberOfLines={1}>{desc}</Text>}
                </View>
                {usingFavorite && <AntDesign 
                    name={isFavorite? "star" : "staro"}
                    color={isFavorite? Colors.accent : Colors.gray}
                    size={Size.scaleSize(24)}
                    style={{marginRight: Size.scaleSize(5)}}
                    onPress={onFavorite}
                />}
                <Entypo 
                    name="chevron-small-right"
                    color={Colors.gray}
                    size={Size.scaleSize(24)}
                />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginHorizontal: Size.scaleSize(15), 
        marginBottom: Size.scaleSize(15),
        padding: Size.scaleSize(15),
        borderRadius: 15,
    },
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        flex: 1, 
        marginRight: Size.scaleSize(15)
    },
    name: {
        fontFamily: Fonts.circularStd,
        color: Colors.black,
        fontSize: Size.scaleSize(14)
    },
    desc: {
        fontFamily: Fonts.circularStd,
        marginTop: Size.scaleSize(5),
        fontSize: Size.scaleFont(12),
        color: Colors.gray
    }
})