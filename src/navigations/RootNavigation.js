import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import SplashScreen from '@screens/SplashScreen';
import OwnersScreen, { screenOptions as ownersOptions } from '@screens/OwnersScreen';
import OwnerDetailScreen, { screenOptions as ownerDetailOptions } from '@screens/OwnerDetailScreen';

const Stack = createStackNavigator();

const RootNavigation = props => {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen 
                        name="Splash"
                        component={SplashScreen}
                    />
                    <Stack.Screen  
                        name="Owners"
                        component={OwnersScreen}
                        options={ownersOptions}
                        initialParams={{master: props.master}}
                    />
                    <Stack.Screen 
                        name="OwnerDetail"
                        component={OwnerDetailScreen}
                        options={ownerDetailOptions}
                        initialParams={{master: props.master}}
                        // initialParams={{master: master}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const stateToProps = (state) => {
    return {
        master: state.master
    }
}

export default connect(stateToProps)(RootNavigation);