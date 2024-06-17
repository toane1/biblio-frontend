import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const AddAuthorScreen = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Le prénom de l\'auteur est nécessaire'),
    lastName: Yup.string().required('Le nom de l\'auteur est nécessaire'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://biblio-oxgk.onrender.com/api/authors/post', {
        firstName: values.firstName,
        lastName: values.lastName,
      });
      console.log('Response:', response.data);
      navigation.navigate('Authors', { refresh: true });
    } catch (error) {
      console.error('Il y a une erreur sur la création de cet auteur!', error);
    }
  };



  return (
    <Formik
      initialValues={{ firstName: '', lastName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="prénom"
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
          />
          {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Nom"
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <Button onPress={handleSubmit} title="Ajouter" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default AddAuthorScreen;
