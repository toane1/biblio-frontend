import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import BorrowScreen from "../../screens/Borrow/Borrowcreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import ProfilScreen from "../../screens/Profil/ProfilScreen";
import BookScreen from "../../screens/Book/BookScreen";


const HomeRoute = () => <HomeScreen/>;
const ProfilRoute = () => <ProfilScreen/>;
const BookRoute = () => <BookScreen/>;
const BorrowRoute = () => <BorrowScreen/>;
export default function BottomNavigator() {
    const [index, setIndex] = React.useState(0);
    const navigation = useNavigation(); // Accès à l'objet navigation
    const [routes] = React.useState([
        {key: 'home', title: 'Accueil', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
        {key: 'profil', title: 'Profil', focusedIcon: 'account', unfocusedIcon: 'account-outline'},
        {key: 'book', title: 'Plant', focusedIcon: 'book', unfocusedIcon: 'book'},
        {key: 'borrow', title: 'Pret', focusedIcon: 'hands-helping', unfocusedIcon: 'hands-helping'},
    ]);

    React.useEffect(() => {
        const routeTitle = routes[index].title;
        navigation.setParams({title: routeTitle});
    }, [index, navigation]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        profil: ProfilRoute,
        book: BookRoute,
        borrow: BorrowRoute,
    });

    return (
        <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{backgroundColor: '#c1eea7'}}
        />
    );
}