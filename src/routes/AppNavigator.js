import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function AppNavigator() {
    const [ headerTitle, setHeaderTitle] = React.useState("Home");

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={BottomNavigator}
                              options={({route}) => ({
                                  title: route.params?.title || 'Titre par Défaut',
                              })}/>
                <Stack.Screen
                    name="borrows" component={BorrowsPage}
                    options={{title: 'Mes gardes en cours'}}/>
                <Stack.Screen
                    name="addBorrow" component={AddBorrowScreen}
                    options={{title: 'Ajouter une garde'}}/>
                <Stack.Screen
                    name="Borrow" component={Borrowcreen}
                    options={{title: 'Gard'}}/>
                <Stack.Screen
                    name="AddPlant" component={AddBookScreen}
                    options={{title: 'Plant'}}/>
                <Stack.Screen
                  name="ProfilModification" component={ProfilModificationScreen}
                  options={{title: 'Gérer mon profil'}}/>
                <Stack.Screen name="Profil" component={BottomNavigator}/>
                <Stack.Screen name="Livre" component={BottomNavigator}/>
                <Stack.Screen name="Pret" component={BottomNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator;
