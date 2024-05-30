import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Colors } from './src/const';

import Navigation from './src/navigation';

import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const backgroundStyle = {
    flex:1,
    backgroundColor: Colors.primary,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigation/>      
    </SafeAreaView>
  );
}

export default App;
