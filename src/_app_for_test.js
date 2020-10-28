import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Students from "./views/Students";
import Student from "./views/Students/student";
import "./App.css";
import DesktopContainer from "./components/Navbar";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Verify from "./views/Verify";
import About from "./views/About";
import FooterLayout from "./components/Footer";

const Main = withRouter(({ location }, loggedin, setLoggedin) => {
  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/verification" && (
          <DesktopContainer status={loggedin} changeStatus={setLoggedin} />
        )}
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
          <Login setStatus={setLoggedin} />
        </Route>
      </Switch>
      <FooterLayout />
    </div>
  );
});

function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <div>
      <Router>
        <Main loggedin={loggedin} setLoggedin={setLoggedin} />
      </Router>
    </div>
  );
}

export default App;
