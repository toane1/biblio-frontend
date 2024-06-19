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
  View
} from 'react-native';
import axios from 'axios';

const GenreListScreen = ({ navigation, route }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get('https://biblio-oxgk.onrender.com/api/genres');
      setGenres(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params?.refresh) {
        fetchGenres();
      }
    });
  }, [navigation, route.params?.refresh, fetchGenres]);

  const handleDelete = async (genreId) => {
    try {
      await axios.delete(`https://biblio-oxgk.onrender.com/api/genres/${genreId}`);
      setGenres(genres.filter(genre => genre.genreId !== genreId));
      Alert.alert('Succès', 'Genre supprimé avec succès');
    } catch (error) {
      Alert.alert('Echec', error.response.data);
      console.error('Erreur lors de la suppression du genre :', error.response.data);
    }
  };
  const handleDetail = (genre) => {
    navigation.navigate('GenreDetail', { genre: genre });
  }

  const handleEdit = (genre) => {
    navigation.navigate('EditGenre', { genreInitial: genre });
  };

  const handleAddGenre = () => {
    navigation.navigate('AddGenre');
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

  const renderGenre = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetail(item)}>
      <View style={styles.card}>
        <Text style={styles.genreText}>{item.genre}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Modifier" onPress={() => handleEdit(item)} />
          <Button title="Supprimer" onPress={() => handleDelete(item.genreId)} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={genres}
        renderItem={renderGenre}
        keyExtractor={(item) => item.genreId.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Button title="Ajouter" onPress={handleAddGenre} />
        <Button title="Retour à l'accueil" onPress={handleGoHome} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  genreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default GenreListScreen;
