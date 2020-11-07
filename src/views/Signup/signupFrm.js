import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Divider
} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import './signup.css'

/**
 * SignupFrm is the graphic user interface for signup
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
const SignupFrm = ({
                     handleSubmit,
                     handleChange,
                     handleBlur,
                     touched,
                     errors,
                     loading,
                     values,
                     toggleRole,
                     role
                   }) => {
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className='frm-container'
    >
      <Grid.Column className="frm-cln">
        <Image
          circular
          src="https://www.holbertonschool.com/holberton-logo.png"
          as={NavLink}
          to="/"
        />
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Header>Signup as {role}</Header>
            
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
              error={
                touched.password_confirmation &&
                errors.password_confirmation
              }
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
            <Divider horizontal>Or</Divider>
            <Button
              basic
              fluid
              size="large"
              type="button"
              onClick={() => {
                console.log(role)
                toggleRole()
                values.role = role;
              }}
            >
              Signup as {role === "student" ? "recruiter" : "student"}
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
  )
}

export default SignupFrm