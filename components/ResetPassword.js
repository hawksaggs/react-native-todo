import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'react-native-elements';

const formValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Required')
});

export default class ResetPassword extends Component {
  resetPassword({ email }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('reset password');
        resolve(true);
      }, 2000);
    });

  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={formValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.login({ email: values.email })
              .then(() => {
                Alert.alert('Reset Password successfully');
                setSubmitting(false);
              })
              .catch((error) => {
                console.log(error);
                Alert.alert(error.message);
                setSubmitting(false);
              });
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            isSubmitting,
            errors,
            touched,
            values
          }) => (
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <Icon name="email" containerStyle={{ padding: 10 }} />
                  <TextInput style={styles.inputs}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <Text style={{ color: 'red' }}>
                    {touched.email && errors.email}
                  </Text>
                </View>

                {
                  isSubmitting ? <ActivityIndicator /> : <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={handleSubmit}>
                    <Text style={styles.loginText}>Reset Password</Text>
                  </TouchableHighlight>
                }

                <TouchableHighlight style={styles.buttonContainer} onPress={() => navigation.navigate('Login')}>
                  <Text>Back To Login</Text>
                </TouchableHighlight>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});