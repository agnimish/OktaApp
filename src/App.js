import React, { Component } from 'react';
// import { StyleSheet, StatusBar, Text, View } from 'react-native';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Home from './components/Home';
import Login from './components/Login';
import Protected from './components/Protected';
import MessageList from './components/MessageList';

function onAuthRequired({history}) {
  history.push('/login');
}

const config = {
  issuer: 'https://dev-304959.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oacuk1msUGa9iaIQ356'
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  onAuthRequired={onAuthRequired} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-304959.okta.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <Route path='/api/messages' component={MessageList}/>
        </Security>
    </Router>
    );
  }
}

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