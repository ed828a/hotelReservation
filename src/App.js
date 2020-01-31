import React from 'react';
import './App.css';
import Rooms from './components/pages/Rooms';
import Error from './components/pages/Error';
import Home from './components/pages/Home'
import SingleRoom from './components/pages/SingleRoom';
import {
  // BrowserRouter as Router, // used in index.js
  Switch,
  Route
  // Link // used in Navbar.js
} from "react-router-dom";
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Error} />
      </Switch>

    </>
  );
}

export default App;
