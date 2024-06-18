import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import AddAuthorScreen from "../screens/Author/AddAuthorScreen";
import AuthorDetailScreen from "../screens/Author/AuthoDetailScreen"
import AddGenreScreen from "../screens/Genre/AddGenreScreen";
import GenreListScreen from "../screens/Genre/GenreListScreen";
import GenreDetailScreen from "../screens/Genre/GenreDetailScreen";
import EditGenreScreen from "../screens/Genre/EditGenreScreen";
import AuthorListScreen from "../screens/Author/AuthorListScreen";
import EditAuthorScreen from "../screens/Author/EditAuthorScreen";
import AddBookScreen from "../screens/Book/AddBookScreen";
import BookListScreen from "../screens/Book/BookListScreen";
import BookDetailScreen from "../screens/Book/BookDetailScreen";
import EditBookScreen from "../screens/Book/EditBookScreen";
import BookListByGenre from "../screens/Book/BookListByGenre";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="AddAuthor" component={AddAuthorScreen} />
        <Stack.Screen name="Authors" component={AuthorListScreen} />
        <Stack.Screen name="AuthorDetail" component={AuthorDetailScreen} />
        <Stack.Screen name="EditAuthor" component={EditAuthorScreen} />

        <Stack.Screen name="AddGenre" component={AddGenreScreen} />
        <Stack.Screen name="Genres" component={GenreListScreen} />
        <Stack.Screen name="GenreDetail" component={GenreDetailScreen} />
        <Stack.Screen name="EditGenre" component={EditGenreScreen} />

        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="Books" component={BookListScreen} />
        <Stack.Screen name="BooksByGenre" component={BookListByGenre} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen name="EditBook" component={EditBookScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
