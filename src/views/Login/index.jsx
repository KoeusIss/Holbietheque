import React, { useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Segment,
  Form,
  Button,
  Message,
  Image,
  Header,
} from "semantic-ui-react";
function Login({ setStatus }) {
  const [loginError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/login", user)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        console.log(localStorage.getItem("access_token"));
        setStatus(true);
        setLoading(true);
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "80vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        {loginError ? (
          <Header textAlign="left" intent="danger" title={loginError} />
        ) : null}
        <Image
          circular
          src="https://www.holbertonschool.com/holberton-logo.png"
          as={NavLink}
        />
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Header>Login</Header>
            <Form.Input
              name="email"
              placeholder="E-mail address"
              icon="user"
              iconPosition="left"
              onChange={handleChange}
              error={!!loginError}
            />
            <Form.Input
              name="password"
              placeholder="Password"
              icon="lock"
              iconPosition="left"
              type="password"
              onChange={handleChange}
              error={!!loginError}
            />
            <Button
              color="pink"
              fluid
              size="large"
              onClick={handleChange}
              loading={loading}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New here? - <Link to="/signup">Sign Up</Link>
        </Message>
        <Message>
          Forget your password? -{" "}
          <Link to="/recover">Recover your password</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
