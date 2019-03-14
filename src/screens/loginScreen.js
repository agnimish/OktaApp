import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import OktaSignIn from '@okta/okta-signin-widget';

export default class LoginScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>This id the Login Screen</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});