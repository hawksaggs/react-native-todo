import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

const formValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('Required')
});

const { width, height } = Dimensions.get('window');

export default class ResetPassword extends Component {
  state = {
    email: ''
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={formValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <View style={styles.container}>
              <View style={styles.inputStyle}>
                <Text>Email:</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <Text style={styles.error}>
                  {touched.email && errors.email}
                </Text>
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Button title="Reset Password" onPress={handleSubmit} />
                )}
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'green'
  },
  inputStyle: {
    padding: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: 'grey'
  },
  error: {
    color: 'red'
  },
  keyboard: {
    flex: 1
  }
});
