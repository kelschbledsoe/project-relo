import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

ReactDOM.render(    
    <Router> 
        <App />
    </Router>,
    document.getElementById('root')
    );

