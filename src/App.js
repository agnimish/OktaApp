import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';

// import RouterWeb from './routing.web';
// import RouterMobile from './routing.native';

import Index from './client/Index';

export default class App extends Component {
  render() {
    return (
      <Index />
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