import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import HttpRequest from '../utils/httpRequest';
// import Storage from '../utils/storage';

export default class ProductList extends Component {
  state = {
    products: []
  };
  async componentDidMount() {
    try {
      const tokenId = await AsyncStorage.getItem('token_id');
      const url = 'http://192.168.0.103:3000/products';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenId}`
        }
      };
      console.log(url, options);
      let response = await HttpRequest.hitApi(url, options);
      console.log(response);
      await this.setState({ products: response });
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  }
  render() {
    const { products } = this.state;
    return (
      <View>
        <Card title="Products">
          {products.map((u, i) => {
            return (
              <View key={i}>
                <Text>{u.name}</Text>
                <Text>{u.description}</Text>
              </View>
            );
          })}
        </Card>
      </View>
    );
  }
}
