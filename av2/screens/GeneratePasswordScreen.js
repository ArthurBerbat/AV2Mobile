import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'passwords.db', location: 'default' });

const GeneratePasswordScreen = () => {
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const savePassword = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT)',
        [],
        () => {
          tx.executeSql('INSERT INTO Passwords (password) VALUES (?)', [password]);
        }
      );
    });
  };

  return (
    <View>
      <Text>Senha Gerada: {password}</Text>
      <Button title="Gerar Senha" onPress={generatePassword} />
      <Button title="Salvar Senha" onPress={savePassword} />
    </View>
  );
};

export default GeneratePasswordScreen;
