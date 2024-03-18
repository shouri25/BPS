/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Navigation from './src/navigation';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation />
      <Toast />
    </SafeAreaView>
  );
}

export default App;
