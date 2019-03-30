import TokenClient from '@okta/okta-react-native'

export default tokenClient = new TokenClient({
  issuer: 'https://dev-304959.okta.com/oauth2/default',
  client_id: '0oad4f89j3Dl0iaEG356',
  scope: 'openid profile',
  redirect_uri: __DEV__ ?
    'exp://localhost:19000/+expo-auth-session' :
    'com.okta.dev-304959:/callback',
});
