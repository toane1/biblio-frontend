import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const AddGenreScreen = ({ navigation }) => {
  const [genre, setGenre] = useState('');

  const handleAddGenre = async () => {
    try {
      const response = await axios.post('https://biblio-oxgk.onrender.com/api/genres', {
        genre: genre.trim(),
      });
      console.log('Genre ajouté avec succès :', response.data);
      Alert.alert('Succès', 'Genre ajouté avec succès');
      setGenre('');
      navigation.navigate('Genres', { refresh: true });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du genre :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du genre');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entrez le genre"
        value={genre}
        onChangeText={(text) => setGenre(text)}
      />
      <Button
        title="Ajouter le genre"
        onPress={handleAddGenre}
        disabled={!genre.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default AddGenreScreen;
