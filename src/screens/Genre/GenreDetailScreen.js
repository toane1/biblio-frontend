import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import axios from 'axios';

const GenreDetailScreen = ({ route }) => {
  const { genre } = route.params;
  const [wikiData, setWikiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWikiData = async () => {
      try {
        const authorName = `${author.lastName} ${author.firstName} `;
        const response = await axios.get(`https://fr.wikipedia.org/api/rest_v1/page/author/${encodeURIComponent(authorName)}`);
        setWikiData(response.data);
      } catch (error) {
        setError(error);
        Alert.alert('Erreur', 'Il y a eu une erreur lors de la récupération des données de Wikipedia');
      } finally {
        setLoading(false);
      }
    };

    fetchWikiData();
  }, [author]);

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
        <Text style={styles.errorText}>Erreur lors de la récupération des données de Wikipedia</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.authorName}>{author.firstName} {author.lastName}</Text>
      {wikiData && (
        <>
          <Text style={styles.description}>{wikiData.extract}</Text>
          <Text style={styles.sourceLink}>
            Source: <Text style={styles.link} onPress={() => Linking.openURL(wikiData.content_urls?.desktop?.page)}>{wikiData.content_urls?.desktop?.page}</Text>
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sourceLink: {
    fontSize: 14,
    color: '#0000ff',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  link: {
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
});

export default GenreDetailScreen;
