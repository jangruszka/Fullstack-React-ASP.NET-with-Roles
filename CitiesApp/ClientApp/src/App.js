import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Map }  from './components/Map.js';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import authService from './components/api-authorization/AuthorizeService';
import './custom.css'
import { AdminAdding } from './components/AdminAdding';

export default class App extends Component {
  static displayName = App.name;
    state = {
    isAuthenticated: false,
    userName: null,
        isAdmin: false
    

    };

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.getAuth());
        this.getAuth();
      

    }

    async getAuth() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

        const name = user && user.name;
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
        const token = await authService.getAccessToken();
        const response = await fetch("api/UserManagement/CheckAdmin", {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'User': JSON.stringify(user),
            },
            method: 'GET',
        });
        const data = await response.json();
        if (data === true) { this.setState({ isAdmin: true }) }    }

 

  render () {
      return (
          <Layout isAuth={this.state.isAuthenticated} isAdm={this.state.isAdmin} userName={this.state.userName} >
           
        <Route exact path='/' component={Home} />

           
              <Route path='/map' render={() => (<Map isAuth={this.state.isAuthenticated} userName={this.state.userName}  ></Map>)} />
                

             
              {this.state.isAdmin ?

                  <Route path='/adminAdding' render={() => (<AdminAdding isAdm={this.state.isAdmin} isAuth={this.state.isAuthenticated} userName={this.state.userName}></AdminAdding>)} />


                  : ""}

            
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
