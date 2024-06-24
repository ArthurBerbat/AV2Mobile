import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Insert() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const insert = async () => {

        try {
            db = await create();
            let result = await db.runAsync(`INSERT INTO contacts (name, phone) VALUES (?, ?);`, name, phone);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Contact registered',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Error on registering contact');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ backgroundColor: 'white', marginTop: 70, width: "80%" }}>
            <TextInput
                placeholder="Entre com o Nome"
                onChangeText={
                    nome => setName(nome)
                }
                style={{ padding: 10 }}
            />
            <TextInput
                placeholder="Entre com o Telefone"
                onChangeText={
                    (phone) => setPhone(phone)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
            />
            <Button title="Save" onPress={() => insert()} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});