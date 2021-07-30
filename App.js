import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppCamera from './src/components/Camera'
import AppVideo from './src/components/Video'
import AppImagePicker from './src/components/ImagePicker'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <AppCamera /> */}
      {/* <AppVideo /> */}
      <AppImagePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
