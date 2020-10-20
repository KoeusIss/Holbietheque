import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Home from "./views/Home";
import Students from "./views/Students";
import Student from "./views/Students/student";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./views/Signup";
import Login from "./views/Login";
import { Container } from "semantic-ui-react";
import Verify from "./views/Verify";

const Main = withRouter(({ location }, loggedin, setLoggedin) => {
  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/verification" && (
          <Navbar status={loggedin} setStatus={setLoggedin} />
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
    </div>
  );
});
function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <Container>
      <Router>
        <Main loggedin={loggedin} setLoggedin={setLoggedin} />
      </Router>
    </Container>
  );
}

export default App;
