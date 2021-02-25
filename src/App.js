import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import { DataStore } from '@aws-amplify/datastore';
import { Authors } from './models';

function App() {
  async function createAuthor()
  {
    await DataStore.save(
      new Authors({
      "first_name": "Lorem ipsum dolor sit amet",
      "last_name": "Lorem ipsum dolor sit amet",
      "Posts": []
    })
  );
  }
  async function queryAuthor()
  {
    const models = await DataStore.query(Authors);
    console.log(models);
  }
  
  return (
    <div className="App">
      <Navigation />
      <Routes />
      <h3>Hello World</h3>
      <button onClick={createAuthor}>Create Author</button>
      <button onClick={queryAuthor}>Query Author</button>

      
    </div>
    
  );
}



export default App;

