import React, { useEffect, useState } from 'react';
import {Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Importer le Picker

const BookListByGenreScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchBooksByGenre();
  }, [selectedGenre]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://biblio-oxgk.onrender.com/api/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchBooksByGenre = async () => {
    try {
      if(selectedGenre ==="Tous les genres"){
        setSelectedGenre(null);
      }
      const url = selectedGenre
        ? `https://biblio-oxgk.onrender.com/api/books/genre/${selectedGenre}`
        : 'https://biblio-oxgk.onrender.com/api/books';

      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error(`Error fetching books by genre ${selectedGenre}:`, error);
      setBooks([]);
    } finally {
    }
  };

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
    navigation.navigate('BookDetail', { book });
  };

  const handleAddBook = () => {
    navigation.navigate('AddBook');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const renderPickerItems = () => {
    return genres.map(genre => (
      <Picker.Item key={genre.genreId} label={genre.genre} value={genre.genreId} />
    ));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.bookContainer}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.authorName}>{`Auteur: ${item.author.firstName} ${item.author.lastName}`}</Text>
        {item.genres.map((genre, index) => (
          <Text key={index}>{`Genre ${genre.genreId}: ${genre.genre}`}</Text>
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
      <View style={styles.dropdownContainer}>
        <Text>Sélectionner un genre :</Text>
        <Picker
          selectedValue={selectedGenre}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedGenre(itemValue)}
        >
          <Picker.Item label="Tous les genres" value={null} />
          {renderPickerItems()}
        </Picker>
      </View>
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
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  bookContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default BookListByGenreScreen;
