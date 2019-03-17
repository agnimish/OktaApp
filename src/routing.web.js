import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Home from './components/Home';
import Login from './components/Login';
import Protected from './components/Protected';
import MessageList from './components/MessageList';

import {config_web as config} from './config';

function onAuthRequired({history}) {
    history.push('/login');
}

export default class RouterWeb extends Component {
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
