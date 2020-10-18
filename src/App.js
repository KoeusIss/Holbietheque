import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Students from "./views/Students";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./views/Signup";
import Login from "./views/Login";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <Router>
      <Navbar status={loggedin} changeStatus={setLoggedin} />
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login setStatus={setLoggedin} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
