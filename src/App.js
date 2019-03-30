import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TokenClient from '@okta/okta-react-native';
import config from './.samples.config';

const tokenClient = new TokenClient({
  issuer: config.oidc.issuer,
  client_id: config.oidc.clientId,
  scope: config.oidc.scope,
  redirect_uri: config.oidc.redirectUri
});

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      context: null
    }
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await tokenClient.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated: authenticated });
    }
  }

  async login() {
    await tokenClient.signInWithRedirect();
    this.setContext('Logged in!');
  }

  async logout() {
    await tokenClient.signOut();
    this.setState({context: '' });
  }

  async getUser() {
    if (!this.state.authenticated) {
      this.setContext('User has not logged in.');
      return;
    }
    const user = await tokenClient.getUser();
    this.setContext(`
      User Profile:
      ${JSON.stringify(user, null, 4)}
    `);
  }

  async getMessages() {
    if (!this.state.authenticated) {
      this.setContext('User has not logged in.');
      return;
    }

    await fetch(config.resourceServer.messagesUrl, {  
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await tokenClient.getAccessToken()}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setContext(JSON.stringify(json.messages, null, 4));
    })
    .catch((err) => {
      console.warn(err);
      const error = `
      Failed to fetch messages. Please verify the following:
      - You've downloaded one of our resource server examples, and it's running on port 8000.
      - Your resource server example is using the same Okta authorization server (issuer) that you have configured this application to use.
      `
      console.warn(error);
      this.setContext('Failed to fetch messages.');
    });
  }

  setContext = (message) => {
    this.setState({
      context: message
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Okta + React Native</Text>
        <View style={styles.button}>
          {this.state.authenticated ?
            <Button
              onPress={ async () => { this.logout() } }
              title="Logout"
            /> :
            <Button
              onPress={ async () => { this.login() } }
              title="Login"
            />
          }
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              onPress={ async () => { this.getUser() } }
              title="Profile"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={ async () => { this.getMessages() } }
              title="Messages"
            />
          </View>
        </View>
        <Text>{this.state.context}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 15,
    width: '40%',
    height: 40,
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// import React, { Component } from 'react';
// import { StyleSheet, StatusBar, Text, View } from 'react-native';

// import RouterWeb from './routing.web';
// // import RouterMobile from './routing.native';

// export default class App extends Component {
//   render() {
//     return (
//       // <RouterWeb/>
//       // <RouterMobile/>
//     );
//   }
// }


// <------ DON'T DELETE COMMENTED CODE, IT IS FOR FUTUTE REFERNCE ------->

// import React, { Component } from 'react';
// import { Alert, UIManager, LayoutAnimation } from 'react-native';
// import { authorize, refresh, revoke } from 'react-native-app-auth';
// import { Page, Button, ButtonContainer, Form, Heading } from '../components';

// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

// type State = {
//   hasLoggedInOnce: boolean,
//   accessToken: ?string,
//   accessTokenExpirationDate: ?string,
//   refreshToken: ?string
// };

// const config = {
//   issuer: 'https://dev-304959.okta.com/oauth2/default',
//   clientId: '0oacuk1msUGa9iaIQ356',
//   redirectUrl: 'https://localhost:3000:/callback',
//   additionalParameters: {},
//   scopes: ['openid', 'profile', 'email', 'offline_access']
// };

// export default class App extends Component<{}, State> {
//   state = {
//     hasLoggedInOnce: false,
//     accessToken: '',
//     accessTokenExpirationDate: '',
//     refreshToken: ''
//   };

//   animateState(nextState: $Shape<State>, delay: number = 0) {
//     setTimeout(() => {
//       this.setState(() => {
//         LayoutAnimation.easeInEaseOut();
//         return nextState;
//       });
//     }, delay);
//   }

//   authorize = async () => {
//     try {
//       const authState = await authorize(config);
//       this.animateState(
//         {
//           hasLoggedInOnce: true,
//           accessToken: authState.accessToken,
//           accessTokenExpirationDate: authState.accessTokenExpirationDate,
//           refreshToken: authState.refreshToken
//         },
//         500
//       );
//     } catch (error) {
//       Alert.alert('Failed to log in', error.message);
//     }
//   };

//   refresh = async () => {
//     try {
//       const authState = await refresh(config, {
//         refreshToken: this.state.refreshToken
//       });

//       this.animateState({
//         accessToken: authState.accessToken || this.state.accessToken,
//         accessTokenExpirationDate:
//           authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
//         refreshToken: authState.refreshToken || this.state.refreshToken
//       });
//     } catch (error) {
//       Alert.alert('Failed to refresh token', error.message);
//     }
//   };

//   revoke = async () => {
//     try {
//       await revoke(config, {
//         tokenToRevoke: this.state.accessToken,
//         sendClientId: true
//       });
//       this.animateState({
//         accessToken: '',
//         accessTokenExpirationDate: '',
//         refreshToken: ''
//       });
//     } catch (error) {
//       Alert.alert('Failed to revoke token', error.message);
//     }
//   };

//   render() {
//     const {state} = this;
//     return (
//       <Page>
//         {!!state.accessToken ? (
//           <Form>
//             <Form.Label>accessToken</Form.Label>
//             <Form.Value>{state.accessToken}</Form.Value>
//             <Form.Label>accessTokenExpirationDate</Form.Label>
//             <Form.Value>{state.accessTokenExpirationDate}</Form.Value>
//             <Form.Label>refreshToken</Form.Label>
//             <Form.Value>{state.refreshToken}</Form.Value>
//           </Form>
//         ) : (
//           <Heading>{state.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
//         )}

//         <ButtonContainer>
//           {!state.accessToken && (
//             <Button onPress={this.authorize} text="Authorize" color="#017CC0"/>
//           )}
//           {!!state.refreshToken && <Button onPress={this.refresh} text="Refresh" color="#24C2CB"/>}
//           {!!state.accessToken && <Button onPress={this.revoke} text="Revoke" color="#EF525B"/>}
//         </ButtonContainer>
//       </Page>
//     );
//   }
// }