import React from 'react';
import {render} from 'react-dom';
import { Router } from 'react-router-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import history from './history';
import App from './App';


render(
    <Router history={history}>
        <App />
        </Router>,
         document.getElementById('root'));

