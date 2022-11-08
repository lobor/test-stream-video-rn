/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import React from 'react';
// import {Platform} from 'react-native';
// import {
//   SERVER_URL,
// } from 'react-native-dotenv';
import VideoPlayer from 'react-native-video';
//import convertToProxyURL from 'react-native-video-cache';
// import IVSPlayer from 'amazon-ivs-react-native-player';
// import {storage} from '../../context/auth/storage';
//import { Replay } from 'vimond-replay';
//import 'vimond-replay/index.css';

const App = () => {
  const [paused, setPaused] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => setPaused(false), 1000);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <VideoPlayer
          source={{
            uri: 'http://192.168.1.40:3000/a',
            // uri: 'https://d4d5avkoc8hr9.cloudfront.net/videos/FPS/Battlefield5/62c8bcd4aa431eaf41bf7aa4-600624-1840f3d860110-master_playlist-cp.mp4',
            type: 'video/mp4',
          }}
          style={{width: 200, height: 200, backgroundColor: Colors.darker}}
          paused={paused}
          playInBackground={false}
          playWhenInactive={false}
          onLoad={e => {
            console.log('onLoad', e);
          }}
          onError={(e: any) => console.log('log error => ', e)}
          // onBuffer={onBuffer}
          // onProgress={onProgress}
        />
        <Text>toto</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
