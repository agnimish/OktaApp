import React, { Component } from 'react';
import { View } from 'react-native';
import tokenClient from './api/TokenClient';
import { Button, Text, } from 'react-native-elements';
import Login from './screens/Login'
import Home from './screens/Home'


export default class Index extends Component {
      state = {
        authentication: false,
        user: {},
      }

      checkAuthentication = async() => {
        const { authentication } = this.state;
        const authenticated = await tokenClient.isAuthenticated()
        if (authenticated !== authentication) {
          this.setState({ authentication: authenticated })
        }
      }


  async componentDidMount() {
   await this.checkAuthentication()
  }


  logIn = async() => {
    await tokenClient.signInWithRedirect()
    .then((res) => {
      console.log("Success", res);
      this.setState({ user: res });
    })
    .catch((err) => {
      console.log("Error", err)
    })

    this.checkAuthentication()
  }

  logOut = async() => {
    await tokenClient.signOut()
    this.checkAuthentication()
  }

  render() {
    console.log(JSON.stringify(this.state));
    const { authentication } = this.state;
    return (
      <React.Fragment>
        {authentication ?
          <Home onLogout={async () => {this.logOut()}} accessToken={"eyJraWQiOiJTTkJJck14QWdqa3RPLU9ELVV1VDFScnRtUjRZUTBaNFladUtiWm1VR0ZFIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmoyWmlGQ0N0UnFacGpFZjZ2YWFqeDZ3a0ZORUNnNjNYUEptV3hqZmRhaFkiLCJpc3MiOiJodHRwczovL2Rldi03NTM4MDIub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNTU0MDUwNzExLCJleHAiOjE1NTQwNTQzMTEsImNpZCI6IjBvYWVsOWtqZkltdnJVQ1IxMzU2IiwidWlkIjoiMDB1ZWw4ZW10d0FpYkw4TWEzNTYiLCJzY3AiOlsicHJvZmlsZSIsIm9wZW5pZCJdLCJzdWIiOiJzdWRoYW5zaHUuYmFuc2FsaWl0QGdtYWlsLmNvbSJ9.IkM5SNcvzYD5ublqASTNbWq24au3cvUBfors1N8Pll5eUCAEtLj70kfrF_SVAsthbxo4Z7L3GutBhYI2QoCwgXzh30K4QyYgcXGArqgDoixD4Bn36oKzKDj7AAraJdiKcEZgfdRGY8jGf0TvOIkSbTBY0jazjk43hJ1amr7lyeQRcRepheBnCW1SMtC7rYIr_62xY95ie3WgPKAtzrCAi_7eH-aSSpsG0uxVvP2s9pwBkRfQgCke9f9w-tE9tgRUJaoGFwxbk5bDkvPlBmX8oyioW4P8iyYRVm59ZJWF1MSbFp0sJNlYUuUhUHADVxi8ZauRhwQBvqvrhZRiFvN2Xg"}/> :
          <Login onLogin={async () => {this.logIn()}} />
         }
      </React.Fragment>
    )
  }
}
