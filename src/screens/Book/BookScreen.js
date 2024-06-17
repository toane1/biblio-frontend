import {useFocusEffect, useNavigation} from "@react-navigation/native";
import React, {useCallback, useState} from "react";
import {Alert, FlatList, Text, TouchableOpacity, View} from "react-native";
import {Card} from "react-native-paper";
import {AntDesign} from "@expo/vector-icons";
import {httpClient} from "../../utils/httpClient";
import {Style} from "../../components/Style";


const BookScreen = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      httpClient.get('/user/1')
        .then((response) => {
          const updatedBooks = response.data.map(book => ({
            ...book,
          }));
          setBooks(updatedBooks);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])
  );

  const deleteBook = (bookId) => {
    Alert.alert(
      "Supprimer le livre",
      "Êtes-vous sûr de vouloir supprimer ce livre ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => {
            console.log(bookId);
            httpClient.delete(`/book/${bookId}`)
              .then(() => {
                setbooks(books.filter(book => book.id !== bookId));
              })
              .catch((error) => {
                console.error(error);
                Alert.alert("Erreur", "Problème lors de la suppression de la plante.");
              });
          }
        }
      ]
    );
  };

  const renderPlant = ({item: book}) => (
    <View style={Style.cardContainer}>
      <Card style={Style.bookCard}>
        <Card.Content>
          <Text style={Style.bookTitle}>{book.title} ({plant.species})</Text>
          <Text style={Style.plantCare}>{plant.careInstructions}</Text>
        </Card.Content>
      </Card>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => deletePlant(plant.id)}>
        <AntDesign name="closecircle" size={24} color="red"/>
      </TouchableOpacity>
    </View>
  );

  const CustomHeader = () => (
    <View style={Style.customHeader}>
      <Text style={Style.headerTitle}>Mes Plantes</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddPlant')}>
        <AntDesign name="pluscircle" size={24} color="#000"/>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <CustomHeader/>
      <FlatList
        data={plants}
        renderItem={renderPlant}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}
export default BookScreen;
