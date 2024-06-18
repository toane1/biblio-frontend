import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const BookListScreen = ({ navigation, route }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get('https://biblio-oxgk.onrender.com/api/books');
      setBooks(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params?.refresh) {
        fetchBooks();
      }
    });
  })

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://biblio-oxgk.onrender.com/api/books/${bookId}`);
      setBooks(books.filter(book => book.bookId !== bookId));
      Alert.alert('Success', 'Le livre a bien été supprimé');
    } catch (error) {
      Alert.alert('Error', 'Une erreur a eu lieu lors de la suppression du livre');
      console.error('Une erreur a eu lieu lors de la suppression du livre', error);
    }
  };

  const handleEdit = (book) => {
    navigation.navigate('EditBook', { book });
  };

  const handlePress = (book) => {
    navigation.navigate('BookDetail', { book});
  };

  const handleAddBook = () => {
    navigation.navigate('AddBook');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.bookContainer}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.authorName}>{`Auteur: ${item.author.firstName} ${item.author.lastName}`}</Text>
        {item.genres.map((genre, index) => (
          <Text key={index}>{`Genre ${index + 1}: ${genre.genre}`}</Text>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Modifier" onPress={() => handleEdit(item)} />
          <Button title="Supprimer" onPress={() => handleDelete(item.bookId)} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.bookId.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Button title="Ajouter" onPress={handleAddBook} />
        <Button title="Retour à l'accueil" onPress={handleGoHome} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 100, // Pour éviter que le contenu de la liste ne soit caché par le footer
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff', // Assurez-vous que le footer a un fond pour éviter les superpositions
  },
});

export default BookListScreen;
