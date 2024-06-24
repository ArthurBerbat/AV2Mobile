import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Gerar Senha"
        onPress={() => navigation.navigate('GeneratePassword')}
      />
      <Button
        title="Ver Senhas"
        onPress={() => navigation.navigate('PasswordList')}
      />
    </View>
  );
};

export default HomeScreen;
