import axios from "axios";
import {apiIp} from "./config";
import {UserData} from "./UserData";

const userData = UserData()

export const httpClient = axios.create({
    baseURL: apiIp,
    timeout: 1000,
    headers: {'X-Authorization': userData.jwt}
  });
