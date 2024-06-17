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
} from 'react-native';
import axios from 'axios';

const EditAuthorScreen = ({ route, navigation }) => {
  const { author } = route.params;
  const [firstName, setFirstName] = useState(author.firstName);
  const [lastName, setLastName] = useState(author.lastName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`https://biblio-oxgk.onrender.com/api/authors/${author.authorId}`, {
        firstName,
        lastName
      });
      Alert.alert('Success', 'La mise à jour de l\'auteur s\'est corectement passée.');
      navigation.navigate('Authors', { refresh: true });
    } catch (error) {
      setError(error);
      Alert.alert('Erreur', 'Il y a eu une erreur lors de la mise à jour de l\'auteur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Sauvegarder" onPress={handleSave} />
        )}
        { error && <Text style={styles.errorText}>Il y a eu une erreur lors de la mise à jour de l'auteur</Text>}
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

export default EditAuthorScreen;
