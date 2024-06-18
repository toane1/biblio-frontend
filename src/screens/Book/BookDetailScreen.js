import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importation de useNavigation depuis React Navigation

const BookDetailScreen = ({ route }) => {
  const navigation = useNavigation(); // Obtenir l'objet de navigation depuis React Navigation
  const {book} = route.params;
  const onPressEdit = () => {
    // Navigation vers la page EditBook avec l'identifiant du livre en paramètre
    navigation.navigate('EditBook', { book }); // Assurez-vous que book contient les détails du livre avant de naviguer
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text><Text style={styles.label}>Auteur:</Text> {book.author.firstName} {book.author.lastName}</Text>
      <Text><Text style={styles.label}>ISBN:</Text> {book.isbn}</Text>
      <Text><Text style={styles.label}>Genres:</Text> {book.genres.map(genre => genre.genre).join(', ')}</Text>
      <Text><Text style={styles.label}>Date de publication:</Text> {book.publicationDate}</Text>
      <TouchableOpacity style={styles.button} onPress={onPressEdit}>
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookDetailScreen;
