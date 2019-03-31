import TokenClient from '@okta/okta-react-native'

export default tokenClient = new TokenClient({
  issuer: 'https://dev-304959.okta.com/oauth2/default',
  client_id: '0oad4f89j3Dl0iaEG356',
  scope: 'openid profile',
  redirect_uri: 'exp://172.23.150.39:19000',
});
