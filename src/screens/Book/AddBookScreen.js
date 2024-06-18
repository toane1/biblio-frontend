import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Button, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

const AddBookScreen = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publicationDate, setPublicationDate] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isAuthorModalVisible, setAuthorModalVisible] = useState(false);
  const [isGenreModalVisible, setGenreModalVisible] = useState(false);
  const [newAuthorFirstName, setNewAuthorFirstName] = useState('');
  const [newAuthorLastName, setNewAuthorLastName] = useState('');
  const [newGenreGenre, setNewGenreGenre] = useState('');
  const navigation = useNavigation();

  const fetchAuthors = async () => {
    try {
      const response = await fetch('https://biblio-oxgk.onrender.com/api/authors');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      const sortedAuthors = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setAuthors(sortedAuthors);
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

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
  }, []);

  const handleSaveBook = async () => {
    try {
      if (!title || !isbn || !selectedAuthor || selectedGenres.length === 0) {
        Alert.alert('Champs requis', 'Veuillez remplir tous les champs avant d\'ajouter le livre.');
        return;
      }

      const authorPayload = {};
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
      if (response.status !== 200) {
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

  const handleAddAuthor = async () => {
    if(newAuthorFirstName && newAuthorLastName){
      try {
        const response = await axios.post('https://biblio-oxgk.onrender.com/api/authors', {
          firstName: newAuthorFirstName,
          lastName: newAuthorLastName,
        });

        if (response.status !== 200) {
          throw new Error('Failed to add author');
        }
        const newAuthor = response.data;
        Alert.alert('Auteur ajouté', 'L\'auteur a été ajouté avec succès.');
        setAuthorModalVisible(false); // Fermer la modal
        setSelectedAuthor(newAuthor.authorId);
        setNewAuthorFirstName(''); // Réinitialiser les champs du formulaire
        setNewAuthorLastName('');
        fetchAuthors(); // Rafraîchir la liste des auteurs

      } catch (error) {
        console.error('Error adding author:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'auteur.');
      }
    }else {
      alert("Tous les champs doivent être renseignés");
    }
  };
  const handleAddGenre = async () => {
    if(newGenreGenre){
      try {
        const response = await axios.post('https://biblio-oxgk.onrender.com/api/genres', {
          genre: newGenreGenre,
        });
        if (response.status !== 200) {
          throw new Error('Failed to add author');
        }
        const newGenre = response.data;
        Alert.alert('Genre ajouté', 'Le genre a été ajouté avec succès.');
        setGenreModalVisible(false); // Fermer la modal
        setNewGenreGenre('');
        toggleGenre(newGenre.genreId);
        await fetchGenres();

      } catch (error) {
        console.error('Error adding genre:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du genre');
      }
    }else {
      alert("Le nouveau genre doit être renseigné.");
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
      <View style={styles.row}>
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
        <Button title="Ajouter Auteur" onPress={() => setAuthorModalVisible(true)} />
      </View>
      <Text><Text style={styles.label}>ISBN:</Text></Text>
      <TextInput
        style={styles.input}
        value={isbn}
        onChangeText={setIsbn}
        placeholder="Entrez le numéro ISBN"
      />


      <View style={styles.row}>
        <Text><Text style={styles.label}>Genres:</Text></Text>

        <Button title="Ajouter Genre" onPress={() => setGenreModalVisible(true)} />
      </View>
      {renderGenresCheckboxes()}


      <Button onPress={handleSaveBook} title="Ajouter le livre" />

      <Modal
        visible={isAuthorModalVisible}
        animationType="slide"
        onRequestClose={() => setAuthorModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Ajouter un Auteur</Text>
          <TextInput
            style={styles.input}
            value={newAuthorFirstName}
            onChangeText={setNewAuthorFirstName}
            placeholder="Prénom"
          />
          <TextInput
            style={styles.input}
            value={newAuthorLastName}
            onChangeText={setNewAuthorLastName}
            placeholder="Nom"
          />
          <Button title="Enregistrer" onPress={handleAddAuthor} />
          <Button title="Annuler" onPress={() => setAuthorModalVisible(false)} />
        </View>
      </Modal>

      <Modal
        visible={isGenreModalVisible}
        animationType="slide"
        onRequestClose={() => setGenreModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Ajouter un Genre</Text>
          <TextInput
            style={styles.input}
            value={newGenreGenre}
            onChangeText={setNewGenreGenre}
            placeholder="Genre"
          />
          <Button title="Enregistrer" onPress={handleAddGenre} />
          <Button title="Annuler" onPress={() => setGenreModalVisible(false)} />
        </View>
      </Modal>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AddBookScreen;
