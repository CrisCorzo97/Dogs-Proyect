import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" >
        <Landing />
      </Route>
      <Route path="/home" >
        <Home />
      </Route>
        
    </React.Fragment>
  );
}

export default App;
