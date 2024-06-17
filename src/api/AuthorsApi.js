import {httpClient} from "../utils/httpClient";


export const getUsers = async () => {
  return await httpClient.get('/users');
}

export const getUserById = async (props) => {
  return await httpClient.get('/users/'+props.userId);
}

export const deleteUserById = async (props) => {
  return await httpClient.delete('/users/'+props.userId);
}

export const postUser = async (props) => {
  return await httpClient.get('/users', {
    "username": props.form.username,
    "lastname": props.form.lastname,
    "firstname": props.form.firstname,
    "password": props.form.password,
    "email": props.form.email,
    "phone": props.form.phone,
    "roles": [
      {
        "id": 0,
        "name": "string",
        "users": [
          "string"
        ]
      }
    ],
    "copys": [
    ]
  });
}