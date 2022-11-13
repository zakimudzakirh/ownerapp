import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Fonts, Size } from '@styles/index';

export const ImageView = ({style, textStyle, text}) => {
    return (
        <View style={[styles.imageView, style]}>
            <Text allowFontScaling={false} style={[styles.imageText, textStyle]}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        width: Size.scaleSize(35), 
        height: Size.scaleSize(35), 
        backgroundColor: Colors.white, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: Size.scaleSize(35),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginRight: Size.scaleSize(10)
    },
    imageText: {
        fontFamily: Fonts.circularStdBold,
        color: Colors.primary,
        fontSize: Size.scaleFont(16),
        textTransform: 'uppercase'
    }
})
