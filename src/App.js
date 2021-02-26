import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import { DataStore } from '@aws-amplify/datastore';
import { Agent } from './models';

function App() {
  async function createAgent()
  {
    await DataStore.save(
      new Agent({
      "firstName": "Tap",
      "lastName": "Amet",
      "companyName": "Lorem ipsum dolor sit amet",
      "email": "j@gmail.com"
    })
  );
  }
  async function queryAgent()
  {
    const models = await DataStore.query(Agent);
    console.log("working");
    console.log(models);
  }
  
  return (
    <div className="App">
      <Navigation />
      <Routes />
      <h3>Hello World</h3>
      <button onClick={createAgent}>Create Agent</button>
      <button onClick={queryAgent}>Query Agent</button>

      
    </div>
    
  );
}



export default App;

