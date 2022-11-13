import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';

import { Colors, Fonts, Size } from '@styles/index';

export const Button = ({ containerStyle, titleStyle, underlayColor, title, onPress, disabled }) => {
    return (
        <TouchableHighlight
            disabled={disabled}
            style={[styles.container, containerStyle]}
            underlayColor={underlayColor ?? Colors.opacityColor(Colors.primary, 0.8)}
            onPress={onPress}
        >
            <View>
                <Text allowFontScaling={false} style={[styles.title, titleStyle]}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

export const ButtonHeader = props => {
    return (
        <HeaderButton
            iconSize={28}
            color={Colors.black}
            {...props}
            style={{marginLeft: 5}}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        marginHorizontal: Size.scaleSize(20),
        alignItems: 'center',
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 10
    },
    title: {
        fontFamily: Fonts.circularStdBold,
        color: Colors.white,
        fontSize: Size.scaleFont(18)
    }
})