/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const webViewRef = useRef();
  const canGoBackRef = useRef(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleBackButtonPress = () => {
    if (canGoBackRef.current) {
      try {
        webViewRef.current?.goBack();
        return true;
      } catch (err) {
        console.log('[handleBackButtonPress] Error : ', err.message);
      }
    }

    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <WebView
        ref={webViewRef}
        style={{flex: 1}}
        source={{uri: 'https://englishtigers.com'}}
        onNavigationStateChange={navState => {
          canGoBackRef.current = navState.canGoBack;
        }}
      />
    </SafeAreaView>
  );
}

export default App;
