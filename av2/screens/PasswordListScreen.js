import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'passwords.db', location: 'default' });

const PasswordListScreen = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Passwords', [], (tx, results) => {
        let rows = [];
        for (let i = 0; i < results.rows.length; i++) {
          rows.push(results.rows.item(i));
        }
        setPasswords(rows);
      });
    });
  }, []);

  const deletePassword = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Passwords WHERE id = ?', [id], () => {
        setPasswords(passwords.filter(password => password.id !== id));
      });
    });
  };

  return (
    <View>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.password}</Text>
            <Button title="Excluir" onPress={() => deletePassword(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default PasswordListScreen;
