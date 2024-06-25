import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Insert } from './banco/Insert';
import { Remove } from './banco/Remove';
import { AllPasswords } from './banco/AllPasswords';

export default function App() {
  return (
    <View style={styles.container}>
      <Insert />
      <Remove />
      <AllPasswords />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
