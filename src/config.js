export const config_mobile = {
  issuer: 'https://dev-304959.okta.com/oauth2/default',
  client_id: '0oad4f89j3Dl0iaEG356',
  scope: 'openid profile',
  redirect_uri: 'localhost:19000/+expo-auth-session',
  // redirect_uri: __DEV__ ? 'localhost:19000/+expo-auth-session' : '{yourOktaScheme}:/+expo-auth-session'
}

// export const config_web = {
//   issuer: 'https://dev-304959.okta.com/oauth2/default',
//   redirect_uri: window.location.origin + '/implicit/callback',
//   client_id: '0oacuk1msUGa9iaIQ356'
// }
