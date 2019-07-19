import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import Axios from 'axios';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: this.props.isAuth,
            userName: this.props.userName,
            isAdmin: this.props.isAdm
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();

    
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])

  
            const name = user && user.name;

        this.setState({
            isAuthenticated,
            userName: user && user.name
        });


        const token = await authService.getAccessToken();
        const response = await fetch("api/UserManagement/CheckAdmin" , {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'User': JSON.stringify(user),
            },
            method: 'GET',
        });
        console.log(user);
        const data = await response.json();
        if (data === true) { this.setState({ isAdmin: true }) }


    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem>
            {this.state.isAdmin ? <NavItem>
                <NavLink tag={Link} className="text-dark btn btn-outline-warning" to="/adminAdding">Admin panel</NavLink>
            </NavItem> : ""   }

            

        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
}
