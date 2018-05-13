import React, { Component } from 'react';
import Auth from './Auth/Auth.js';
import {Button,Navbar,Nav,NavItem,FormControl,FormGroup, Image} from 'react-bootstrap';
import './LandingPage.css';
import PropTypes from 'prop-types';

class LandingPage extends Component{
    constructor(props){
        super(props);
        this.enterButton = this.enterButton.bind(this);
        this.state = {auth:new Auth()};
    }
    enterButton(){
        const { userProfile } = this.state.auth;
        if (!userProfile) {
            this.state.auth.login();
        } else {
            this.props.history.push(`/ToDO`)
        }
    }

        //auth.login();
    render(){
        return(
            <div className="wrapper">
                <h1 className='title'>React+Firebase To Do list </h1>
                <div className='btnWrappwer'>
                    <Button bsStyle='info' bsSize='lg'
                        onClick={this.enterButton} >
                        Enter
                    </Button>
                </div>
            </div>
        );
    }
}
LandingPage.propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
}
export default LandingPage;
