import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import GameScreen from './src/screens/GameScreen';
import { Colors } from './src/constants/Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.linkedinBlue} />
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});