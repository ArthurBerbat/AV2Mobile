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
        tx.executeSql(
          'INSERT INTO passwords (password) VALUES (?);',
          [password],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Password saved',
                [{ text: 'Ok' }],
                { cancelable: false }
              );
              console.log("[LOG] Password saved successfully");
            } else {
              alert('Error saving password');
              console.log("[LOG] Error: No rows affected");
            }
          },
          (_, error) => {
            alert('Error saving password: ' + error.message);
            console.log("[LOG] Error saving password", error);
          }
        );
      });
    } catch (error) {
      console.log("[LOG] Error during insert operation", error);
      alert('Error during insert operation: ' + error.message);
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
