import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, StyleSheet } from 'react-native';
import { create } from './Create';

export function AllPasswords() {
  const [flatListItems, setFlatListItems] = useState([]);

  const getAll = async () => {
    try {
      let db = await create();
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM passwords',
          [],
          (tx, results) => {
            setFlatListItems(results.rows._array);
            console.log("[LOG] Data retrieved from table passwords:", results.rows._array);
            if (results.rows.length == 0) {
              Alert.alert(
                'Warning',
                'No password saved',
                [{ text: 'Ok' }],
                { cancelable: false }
              );
            }
          },
          (_, error) => {
            console.log("[LOG] Error retrieving data", error);
            alert('Error retrieving data: ' + error.message);
          }
        );
      });
    } catch (error) {
      console.log("[LOG] Error during select operation", error);
      alert('Error during select operation: ' + error.message);
    }
  };

  const listItemView = (item) => {
    return (
      <View key={item.id} style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>ID</Text>
        <Text style={styles.textbottom}>{item.id}</Text>
        <Text style={styles.textheader}>Password</Text>
        <Text style={styles.textbottom}>{item.password}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, width: "80%", marginTop: 10 }}>
      <Button title="List" onPress={() => getAll()} />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700'
  },
  textbottom: {
    color: '#111',
    fontSize: 18
  }
});
