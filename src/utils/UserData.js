import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserData = async () => {
    return JSON.parse(await AsyncStorage.getItem('CURRENT_USER'))}

