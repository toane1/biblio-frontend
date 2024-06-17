import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue dans ma bibliothèque</Text>
      <Button
        title="Ajouter un livre"
        onPress={() => navigation.navigate('CreateBook')}
      />
      <Button
        title="Consulter la liste des auteurs"
        onPress={() => navigation.navigate('Authors')}
      />
      <Button
        title="Consulter la liste des genre"
        onPress={() => navigation.navigate('Genres')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
