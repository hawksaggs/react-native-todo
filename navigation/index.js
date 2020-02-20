import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../components/Home';
import ResetPassword from '../components/ResetPassword';

const Stack = createStackNavigator();

export default class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Reset"
            component={ResetPassword}
            options={{ title: 'Reset Password' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
