import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';import axios from 'axios';

const EditGenreScreen = ({ route, navigation }) => {
  const { genreInitial } = route.params;
  const [genre, setGenre] = useState(genreInitial.genre);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`https://biblio-oxgk.onrender.com/api/genres/${genreInitial.genreId}`, {
        genre
      });
      Alert.alert('Succès', 'Genre modifié avec succès');
      navigation.navigate('Genres', { refresh: true });
    } catch (error) {
      setError(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la modification du genre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Genre</Text>
        <TextInput
          style={styles.input}
          placeholder="Modifier le genre"
          value={genre}
          onChangeText={(text) => setGenre(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Sauvegarder" onPress={handleSave} />
        )}
        { error && <Text style={styles.errorText}>Il y a eu une erreur lors de la mise à jour du genre</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  form: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default EditGenreScreen;
