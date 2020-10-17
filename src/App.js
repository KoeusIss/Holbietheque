import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home'
import Students from "./views/students";
import './App.css';

function App() {
  return (
    <Router>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/students'>Students</Link>
            </li>
        </ul>
        <Switch>
            <Route path='/' exact={true} >
                <Home/>
            </Route>
            <Route path='/students' >
                <Students/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
