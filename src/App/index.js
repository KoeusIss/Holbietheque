import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Contact from "../views/Contact";
import Home from "../views/Home";
import Students from "../views/Students";
import Student from "../views/Students/student";
import Signup from "../views/Signup";
import Login from "../views/Login";
import Verify from "../views/Verify";
import About from "../views/About";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProfile from "../views/New"
import "./App.css";

/**
 * Application main parent component
 */
const App = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/verification" && <Navbar />}
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/students" exact>
          <Students />
        </Route>
        <Route path="/students/:id" exact>
          <Student />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/verification">
          <Verify />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/new">
          <NewProfile />
        </Route>
      </Switch>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/verification" && <Footer />}
    </div>
  );
});

export default App;
