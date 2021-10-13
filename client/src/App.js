import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';
import DogCreator from './components/DogCreator.jsx';
import Details from './components/Details';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route path="/dog" component={DogCreator} />
      <Route path="/home/:id" component={Details} />
        
    </React.Fragment>
  );
}

export default App;
