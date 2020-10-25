// Signup view

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/auth_service";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { toaster } from "evergreen-ui";
import User from '../../models/User'

function Signup() {
  const [user, setUser] = useState(new User());
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Formik
        initialValues={new User()}
        onSubmit={(values) => {
          setLoading(true);
          AuthService.signup(values).then(
            (response) => {
              setLoading(false)
              toaster.success(response.data.message, { duration: 5 });
            },
            (error) => {
              const returnError =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setLoading(false);
              toaster.danger(returnError, { duration: 5 });
            }
          );
        }}
        validationSchema={yup.object().shape({
          email: yup.string()
            .required('Email is required')
            .matches(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
              "Please provide a valid email address"),
          password: yup.string()
            .required('Password is required')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
          password_confirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
        })}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <Grid textAlign="center" verticalAlign="middle" style={{ height: "80vh" }}>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Image
                  circular
                  src="https://www.holbertonschool.com/holberton-logo.png"
                  as={NavLink}
                  to="/"
                />
                <Form size="large" onSubmit={handleSubmit}>
                  <Segment stacked>
                    <Header>Signup</Header>
                    <Segment>
                      <Button.Group>
                        <Button
                          onClick={handleChange}
                          name="role"
                          value="recruiter"
                          color="teal"
                        >Recruiter</Button>
                        <Button.Or text="or" />
                        <Button
                          onClick={handleChange}
                          name="role"
                          value="student"
                          color="pink"
                        >Student</Button>
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
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                    <Form.Input
                      name="password"
                      placeholder="Password"
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.password && errors.password}
                    />
                    <Form.Input
                      name="password_confirmation"
                      placeholder="Password confirmation"
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.password_confirmation && errors.password_confirmation}
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
        }}
      />
    </>
  );
};

export default Signup;
