import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

export default class Home extends Component {
  state = {
    email: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome!!!</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(val) => { this.setState({email: val}) }}
        />
        <Button
          title="Reset Password"
          onPress={() => {
            this.props.navigation.navigate('Reset');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
