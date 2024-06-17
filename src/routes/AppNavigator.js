import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import CreateBookScreen from '../screens/Book/CreateBookScreen';
import AddAuthorScreen from "../screens/Author/AddAuthorScreen";
import AuthorDetailScreen from "../screens/Author/AuthoDetailScreen"
import AddGenreScreen from "../screens/Genre/AddGenreScreen";
import GenreListScreen from "../screens/Genre/GenreListScreen";
import GenreDetailScreen from "../screens/Genre/GenreDetailScreen";
import EditGenreScreen from "../screens/Genre/EditGenreScreen";
import AuthorListScreen from "../screens/Author/AuthorListScreen";
import EditAuthorScreen from "../screens/Author/EditAuthorScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateBook" component={CreateBookScreen} />

        <Stack.Screen name="AddAuthor" component={AddAuthorScreen} />
        <Stack.Screen name="Authors" component={AuthorListScreen} />
        <Stack.Screen name="AuthorDetail" component={AuthorDetailScreen} />
        <Stack.Screen name="EditAuthor" component={EditAuthorScreen} />

        <Stack.Screen name="AddGenre" component={AddGenreScreen} />
        <Stack.Screen name="Genres" component={GenreListScreen} />
        <Stack.Screen name="GenreDetail" component={GenreDetailScreen} />
        <Stack.Screen name="EditGenre" component={EditGenreScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
