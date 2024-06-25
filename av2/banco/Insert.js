import React, { useState } from 'react';
import { Alert, Button, View, TextInput, StyleSheet, Text } from 'react-native';
import { create } from './Create';

const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export function Insert() {
  const [password, setPassword] = useState('');

  const insert = async () => {
    try {
      let db = await create();
      db.transaction(tx => {
        tx.executeSql('INSERT INTO passwords (password) VALUES (?);', [password], (tx, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Password saved',
              [{ text: 'Ok' }],
              { cancelable: false }
            );
          } else {
            alert('Error saving password');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', marginTop: 70, width: "80%" }}>
      <Button title="Generate Password" onPress={() => setPassword(generatePassword())} />
      <Text>Password: {password}</Text>
      <Button title="Save" onPress={() => insert()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});
