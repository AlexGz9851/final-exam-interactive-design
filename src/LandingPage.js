import React, { Component } from 'react';
import {Button,Navbar,Nav,NavItem,FormControl,FormGroup, Image} from 'react-bootstrap';
import './LandingPage.css';

class LandingPage extends Component{

    render(){
        return(
            <div className="wrapper">
                <h1 className='title'>React+Firebase To Do list </h1>
                <div className='btnWrappwer'>
                    <Button bsStyle='info' bsSize='lg'>
                        Log in
                    </Button>
                </div>
            </div>
        )
    }
}
export default LandingPage;
