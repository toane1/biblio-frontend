import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CreateBookScreen = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Le prénom de l\'auteur est nécessaire'),
    lastName: Yup.string().required('Le nom de l\'auteur est nécessaire'),
  });

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Here you can handle the form submission, e.g., send data to a server
        console.log(values);
        navigation.goBack();
      }}
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
            placeholder="Title"
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <Button onPress={handleSubmit} title="Submit" />
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

export default CreateBookScreen;
