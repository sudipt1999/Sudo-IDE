import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"


import Ide from './pages/Ide/Ide'

function App() {
  return (
    <Router>
      <Route path="/" component={Ide} />
    </Router>
  );
}

export default App;
