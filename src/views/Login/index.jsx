/**
 * Login views related to the route @/login where the user can login to a new
 * session by providing his credentials as email and password and pick up
 * between to be a student or a recruiter
 */

import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import AuthService from "../../services/auth_service";
import User from "../../models/User";
import {Formik} from "formik";
import * as yup from "yup";

import {toaster} from "evergreen-ui";
import LoginFrm from "./loginFrm";

/**
 * Login component
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  
  /**
   * initialValue is and instance of User class with email and password
   * attributes
   * @type {User}
   */
  const initialValue = new User()
  
  /**
   * handle submit values given by formik and sends an API request
   * in order to get an access_token to persist user connectivity
   * @param {object} values contains email, password
   */
  const onSubmit = (values) => {
    setLoading(true);
    console.log(values)
    AuthService.login(values).then(
      (response) => {
        setLoading(false);
        history.push("/");
        toaster.success(response.data.message, {duration: 5});
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toaster.danger(returnError, {duration: 5});
      }
    );
  }
  
  /**
   * validationSchema is a yup object provides rules for fields
   */
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required"),
  })
  
  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={({
                   values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit,
                 }) => {
          return (
            <LoginFrm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
              loading={loading}
            />
          );
        }}
      />
    </>
  );
}
export default Login;
