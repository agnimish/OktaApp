export default {
    oidc: {
      clientId: '0oad4f89j3Dl0iaEG356',
      issuer: 'https://dev-304959.okta.com/oauth2/default',
      redirectUri: __DEV__ ? 'exp://localhost:19000/+expo-auth-session' : 'com.okta.dev-304959:/callback',
      scope: 'openid profile',
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
  };