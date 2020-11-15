/**
 * App main parent component
 */
import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Contact from "../views/Contact";
import Home from "../views/Home";
import StudentList from "../views/StudentList";
import Student from "../views/Student";
import Signup from "../views/Signup";
import Login from "../views/Login";
import Verify from "../views/Verify";
import About from "../views/About";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProfile from "../views/New"
import PageNotFound from "../views/PageNotFound";
import RecruiterProfile from "../views/Recruiter";
import Jobs from "../views/Job";
import "./App.css";

/**
 * App component that dispatching routes with react-router-dom and take the
 * location props as argument to exclude navigation and footer from the login
 * signup and verification view
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
        <Route path="/jobs">
          <Jobs/>
        </Route>
        <Route path="/students" exact>
          <StudentList />
        </Route>
        <Route path="/students/:id" exact>
          <Student />
        </Route>
        <Route path='/recruiters/:id'>
          <RecruiterProfile/>
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
        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
      {(location.pathname === "/" ||
      location.pathname === "/about") &&
      <Footer />}
    </div>
  );
});

export default App;
