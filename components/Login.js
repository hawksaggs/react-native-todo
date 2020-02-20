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
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().min(6, 'Password is too Short').required('Required')
});

export default class Login extends Component {
  login({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('login');
        resolve(true);
      }, 2000);
    });

  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={formValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.login({ email: values.email, password: values.password })
              .then(() => {
                Alert.alert('Login successfully');
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

                <View style={styles.inputContainer}>
                  <Icon name="lock" containerStyle={{ padding: 10 }} />
                  <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <Text style={{ color: 'red' }}>
                    {touched.password && errors.password}
                  </Text>
                </View>
                {
                  isSubmitting ? <ActivityIndicator /> : <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={handleSubmit}>
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableHighlight>
                }

                <TouchableHighlight style={styles.buttonContainer} onPress={() => navigation.navigate('Reset')}>
                  <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer]} onPress={() => navigation.navigate('Signup')}>
                  <Text>Register</Text>
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