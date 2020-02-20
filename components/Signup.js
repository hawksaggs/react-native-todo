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
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid Email').required('Required'),
    password: yup.string().min(6, 'Password is too Short').required('Required'),
    confirmPassword: yup.string().test(
        'confirm-password-test',
        'Password does not match',
        function (value) {
            return value === this.parent.password
        }
    )
});

export default class Login extends Component {
    signUp({ name, email, password }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Signup');
                resolve(true);
            }, 2000);
        });

    }

    render() {
        const { navigation } = this.props;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <Formik
                    initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
                    validationSchema={formValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        this.signUp({ name: values.name, email: values.email, password: values.password })
                            .then(() => {
                                Alert.alert('Signup successfully');
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
                                    <Icon name="person" containerStyle={{ padding: 10 }} />
                                    <TextInput style={styles.inputs}
                                        placeholder="Name"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    <Text style={{ color: 'red' }}>
                                        {touched.name && errors.name}
                                    </Text>
                                </View>

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

                                <View style={styles.inputContainer}>
                                    <Icon name="lock" containerStyle={{ padding: 10 }} />
                                    <TextInput style={styles.inputs}
                                        placeholder="Confirm Password"
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                    />
                                    <Text style={{ color: 'red' }}>
                                        {touched.confirmPassword && errors.confirmPassword}
                                    </Text>
                                </View>

                                {
                                    isSubmitting ? <ActivityIndicator /> : <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={handleSubmit}>
                                        <Text style={styles.loginText}>Register</Text>
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