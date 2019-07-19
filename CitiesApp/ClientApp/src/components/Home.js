import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="container">
        <h1>Hello, world!</h1>
        <p>My first attempt for integrating ASP.NET Core role based authentification with React client app </p>
        <ul>
                <li>Server side code: ASP.NET Core 3.0 (preview)</li>
                <li>User in role of "Admin" has access to Admin Panel in client app created with React - 
                    an interface for CRUD operations available for "Admin" only.
                    
                    </li>
                <li>Admin account is created in startup: username: <b>admin@admin.pl</b>, password: <b>AAaa!!11</b></li>

              

        </ul>
    
      </div>
    );
  }
}
