import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    constructor(props) {
        super(props);

      
    }



  static displayName = Layout.name;

  render () {
    return (
        <div>
            <NavMenu isAuth={this.props.isAuth} isAdm={this.props.isAdm} userName={this.props.userName} />
        
          {this.props.children}
     
      </div>
    );
  }
}
