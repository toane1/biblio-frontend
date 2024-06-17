import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

const AuthorDetailScreen = ({ route }) => {
  const { author } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulate loading completion
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.authorName}>
          {author.firstName} {author.lastName}
        </Text>
        <WebView
          source={{
            uri: `https://fr.wikipedia.org/wiki/${encodeURIComponent(
              `${author.firstName}_${author.lastName}`
            )}`,
          }}
          style={styles.webview}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  authorName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  webview: {
    flex: 1,
    height: 500, // Adjust height as needed
  },
});

export default AuthorDetailScreen;
