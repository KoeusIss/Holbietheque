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
import { Link, useHistory } from "react-router-dom";
import { toaster } from "evergreen-ui";

function Verify() {
  const [otp, setOtp] = useState({
    otp: "",
  });
  const history = useHistory();
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input change and fill user state
  const handleChange = (event) => {
    event.preventDefault();
    setOtp({ ...otp, [event.target.name]: event.target.value });
  };

  // handle form submit
  const onSubmit = (event) => {
    setLoading(true);
    setError("");
    AuthService.verify(otp).then(
      () => {
        localStorage.removeItem("id");
        toaster.success("E-Mail verified, Login Now!", { duration: 3 });
        history.push("/login");
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toaster.danger(error.response.data.message, { duration: 7 });
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
        />
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Header>Code Verification</Header>
            <Form.Input
              name="otp"
              placeholder="Insert your code here"
              icon="lock"
              iconPosition="left"
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
              Send
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? - <Link to="/login">Login</Link>
        </Message>
        <Message>
          Back to signup - <Link to="/signup">Signup</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Verify;
