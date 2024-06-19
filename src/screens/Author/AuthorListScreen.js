import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

const AuthorListScreen = ({ navigation, route }) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuthors = useCallback(async () => {
    try {
      const response = await axios.get('https://biblio-oxgk.onrender.com/api/authors');
      const data = response.data;
      const sortedAuthors = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setAuthors(sortedAuthors);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params?.refresh) {
        fetchAuthors();
      }
    });
  },[navigation, route.params?.refresh, fetchAuthors]);
  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`https://biblio-oxgk.onrender.com/api/authors/${authorId}`);
      setAuthors(authors.filter(author => author.authorId !== authorId));
      Alert.alert('Success', 'L\'auteur a bien été supprimé');
    } catch (error) {
      Alert.alert('Echec', error.response.data);
      console.error('Une erreur a eu lieu lors de la suppression de l\'auteur', error);
    }
  };

  const handleEdit = (author) => {
    navigation.navigate('EditAuthor', { author });
  };

  const handlePress = (author) => {
    navigation.navigate('AuthorDetail', { author });
  };

  const handleAddAuthor = () => {
    navigation.navigate('AddAuthor');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Erreur lors de la récupération des données</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.card}>
        <Text style={styles.authorName}>{item.firstName} {item.lastName}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Modifier" onPress={() => handleEdit(item)} />
          <Button title="Supprimer" onPress={() => handleDelete(item.authorId)} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={authors}
        keyExtractor={(item) => item.authorId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Button title="Ajouter" onPress={handleAddAuthor} />
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

export default AuthorListScreen;
