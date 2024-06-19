import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking, SafeAreaView, TextInput, Button
} from 'react-native';
import axios from 'axios';

const GenreDetailScreen = ({ route, navigation }) => {
  const { genre } = route.params;

  const handleGoBack = async () => {
    navigation.navigate('Genres', { refresh: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text>
          <Text style={styles.label}>Genre:</Text>
          {genre.genre}
        </Text>
        <Button title="Retour à la liste de Genres" onPress={handleGoBack} />
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

export default GenreDetailScreen;
