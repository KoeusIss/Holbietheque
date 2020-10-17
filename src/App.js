import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Students from "./views/Students";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./views/Signup";

function App() {
  return (
    <Router>
      <Navbar />
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
      </Switch>
    </Router>
  );
}

export default App;
