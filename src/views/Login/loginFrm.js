import React from "react";
import {Link, NavLink} from "react-router-dom";
import {
  Grid,
  Segment,
  Form,
  Button,
  Message,
  Image,
  Header,
} from "semantic-ui-react";
import './login.css'

/**
 * LoginFrm is the graphic user interface for login
 * @param {SubmitEvent<any>} handleSubmit
 * @param {ChangeEvent<any>} handleChange
 * @param {FocusEvent<any>} handleBlur
 * @param {object} touched
 * @param {object} errors
 * @param {boolean} loading
 * @param {object} values
 * @returns {JSX.Element}
 * @constructor
 */
const LoginFrm = ({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    touched,
                    errors,
                    loading,
                    values
                  }) => {
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className='frm-container'
    >
      <Grid.Column className='frm-cln'>
        <Image
          circular
          src="https://www.holbertonschool.com/holberton-logo.png"
          as={NavLink}
          to="/"
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
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <Form.Input
              name="password"
              placeholder="Password"
              icon="lock"
              iconPosition="left"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
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
  )
}
export default LoginFrm