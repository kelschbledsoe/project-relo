import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);






function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}


export default withAuthenticator(App);


