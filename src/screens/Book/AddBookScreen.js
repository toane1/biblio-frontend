import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";

const AddBookScreen = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publicationDate, setPublicationDate] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedAuthorObj, setSelectedAuthorObj] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('https://biblio-oxgk.onrender.com/api/authors');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch('https://biblio-oxgk.onrender.com/api/genres');
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchAuthors();
    fetchGenres();
  }, []);

  const handleSaveBook = async () => {
    try {
      if (!title || !isbn || !selectedAuthor || selectedGenres.length === 0) {
          Alert.alert('Champs requis', 'Veuillez remplir tous les champs avant d\'ajouter le livre.');
          return;
      }
      const authorPayload = {
        authorId: selectedAuthorObj.authorId,
        firstName: selectedAuthorObj.firstName,
        lastName: selectedAuthorObj.lastName,
      };

      try {
          const response = await axios.get(`https://biblio-oxgk.onrender.com/api/authors/${selectedAuthor}`);
          if (response.status === 200) {
              authorPayload.authorId  = response.data.authorId;
              authorPayload.firstName = response.data.firstName;
              authorPayload.lastName = response.data.lastName;
          } else {
              Alert.alert('Erreur', 'Auteur non trouvé.');
          }
      } catch (error) {
          console.error('Error fetching author:', error);
          Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des détails de l\'auteur.');
      }


      const genresPayload = selectedGenres.map(genreId => {
        const selectedGenreObj = genres.find(genre => genre.genreId === genreId);
        return {
          genreId: selectedGenreObj.genreId,
          genre: selectedGenreObj.genre,
        };
      });
      const newBook = {
        title: title,
        isbn: isbn,
        author: authorPayload,
        genres: genresPayload,
        publicationDate: publicationDate,
      };

      console.log('New Book:', newBook); // Pour débogage

      const response = await axios.post('https://biblio-oxgk.onrender.com/api/books', newBook, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.status === 200) {
        throw new Error('Failed to add book');
      }

      Alert.alert('Livre ajouté', 'Le livre a été ajouté avec succès.');

      navigation.navigate('Books', { refresh: true });

      // Réinitialiser les champs après l'ajout
      setTitle('');
      setIsbn('');
      setSelectedAuthor('');
      setSelectedGenres([]);
      setPublicationDate('');

    } catch (error) {
      console.error('Error adding book:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du livre.');
    }
  };

  const toggleGenre = (genreId) => {
    const index = selectedGenres.indexOf(genreId);
    if (index !== -1) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const renderGenresCheckboxes = () => {
    // Organiser les genres en lignes de 4
    const rows = [];
    for (let i = 0; i < genres.length; i += 4) {
      const row = genres.slice(i, i + 4).map(genre => (
        <TouchableOpacity
          key={genre.genreId}
          style={[styles.checkbox, selectedGenres.includes(genre.genreId) ? styles.checked : null]}
          onPress={() => toggleGenre(genre.genreId)}
        >
          <Text>{genre.genre}</Text>
        </TouchableOpacity>
      ));
      rows.push(<View key={i} style={styles.checkboxRow}>{row}</View>);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un livre</Text>
      <Text><Text style={styles.label}>Titre:</Text></Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Entrez le titre du livre"
      />
      <Text><Text style={styles.label}>Date de publication:</Text></Text>
      <TextInput
        style={styles.input}
        value={publicationDate}
        onChangeText={setPublicationDate}
        placeholder="Entrez l'année de publication"
      />
      <Text><Text style={styles.label}>Auteur:</Text></Text>
      <Picker
        selectedValue={selectedAuthor}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
      >
        <Picker.Item label="Sélectionnez un auteur" value="" />
        {authors.map(author => (
          <Picker.Item key={author.authorId} label={`${author.firstName} ${author.lastName}`} value={author.authorId} />
        ))}
      </Picker>
      <Text><Text style={styles.label}>ISBN:</Text></Text>
      <TextInput
        style={styles.input}
        value={isbn}
        onChangeText={setIsbn}
        placeholder="Entrez le numéro ISBN"
      />
      <Text><Text style={styles.label}>Genres:</Text></Text>
      {renderGenresCheckboxes()}
      <Button onPress={handleSaveBook} title="Ajouter le livre"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '22%',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007bff',
  },
});

export default AddBookScreen;
