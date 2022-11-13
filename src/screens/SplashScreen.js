import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts, Size } from '@styles/index';

const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace('Owners')
        }, 3000)
    }, [])

    return (
        <SafeAreaView style={styles.screen}>
            <Text allowFontScaling={false} style={styles.title}>Owner App</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: Fonts.circularStdBold,
        fontSize: Size.scaleFont(30)
    }
})

export default SplashScreen;