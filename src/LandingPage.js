import React, { Component } from 'react';
import Auth from './Auth/Auth.js';
import {Button,Navbar,Nav,NavItem,FormControl,FormGroup, Image} from 'react-bootstrap';
import './LandingPage.css';


class LandingPage extends Component{
    login() {
        this.props.auth.login();
      }

        //auth.login();
    render(){
        return(
            <div className="wrapper">
                <h1 className='title'>React+Firebase To Do list </h1>
                <div className='btnWrappwer'>
                    <Button bsStyle='info' bsSize='lg'
                        onClick={this.login.bind(this)} >
                        Log in
                    </Button>
                </div>
            </div>
        )
    }
}
export default LandingPage;
