import React, { useState } from "react";
import AuthService from "../../services/auth_service";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toaster } from "evergreen-ui";

function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    role: "recruiter",
  });
  const history = useHistory();
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input change and fill user state
  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // handle form submit
  const onSubmit = (event) => {
    console.log(user);
    setLoading(true);
    setError("");
    AuthService.signup(user).then(
      () => {
        toaster.notify("Check your E-Mail Inbox for verification code");
        history.push("/verification");
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setError(returnError);
      }
    );
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
          to="/"
        />
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Header>Signup</Header>
            <Segment>
              <Button.Group>
                <Button
                  onClick={handleChange}
                  name="role"
                  value="recruiter"
                  color="teal"
                >
                  Recruiter
                </Button>
                <Button.Or text="or" />
                <Button
                  onClick={handleChange}
                  name="role"
                  value="student"
                  color="pink"
                >
                  Student
                </Button>
              </Button.Group>
            </Segment>
            <Segment>
              <Header as="h4">Hello {user.role}</Header>
            </Segment>
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
            <Form.Input
              name="password_confirmation"
              placeholder="Password confirmation"
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
              type="submit"
              loading={loading}
            >
              Signup
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? - <Link to="/login">Login</Link>
        </Message>
        <Message>
          Forget your password? -{" "}
          <Link to="/recover">Recover your password</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Signup;
