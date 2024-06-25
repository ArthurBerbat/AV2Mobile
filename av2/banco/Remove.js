import React, { useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { create } from './Create';

export function Remove() {
  const [id, setId] = useState('');

  const remove = async () => {
    try {
      let db = await create();
      db.transaction(tx => {
        tx.executeSql('DELETE FROM passwords WHERE id = ?;', [id], (tx, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Password removed',
              [{ text: 'Ok' }],
              { cancelable: false }
            );
          } else {
            alert('Error removing password');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, width: "80%" }}>
      <TextInput
        placeholder="Enter Password ID"
        onChangeText={id => setId(id)}
        style={{ padding: 2 }}
      />
      <Button title="Delete" onPress={() => remove()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1
  }
});
