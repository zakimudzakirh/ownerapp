/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Colors } from '@styles/index';
import RootNavigation from '@navigations/RootNavigation';
import { store, persistor } from '@store/index';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaView style={styles.screen}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.background}
          />
          <RootNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background
  }
});

export default App;
