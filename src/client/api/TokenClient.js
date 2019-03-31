import TokenClient from '@okta/okta-react-native'

export default tokenClient = new TokenClient({
  issuer: 'https://dev-753802.okta.com/oauth2/default',
  client_id: '0oael9kjfImvrUCR1356',
  scope: 'openid profile',
  redirect_uri: 'exp://172.24.242.70:19000',
});
