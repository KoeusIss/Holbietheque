import React, { useState } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import UserService from "../../../services/user_service";
import { toaster } from "evergreen-ui";
import * as yup from "yup";
import { Formik, Field } from "formik";
import AStudent from "../../../models/student";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  genderOptions,
  days,
  months,
  years,
} from "../../../components/Options";

const AddProfile = ({ theTrigger, user_id }) => {
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  return (
    <>
      <Formik
        initialValues={new AStudent()}
        onSubmit={(values) => {
          console.log(values);
          setLoading(true);
          UserService.create(values, user_id).then(
            (response) => {
              setLoading(false);
              setOpen(false);
              localStorage.setItem("pid", response.data.student.id);
              history.push("/students/" + response.data.student.id);
              window.location.reload();
              toaster.notify(response.data.message, { duration: 5 });
            },
            (error) => {
              const returnError =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setLoading(false);
              setOpen(false);
              toaster.notify(returnError, { duration: 5 });
            }
          );
        }}
        validationSchema={yup.object().shape({
          first_name: yup.string().required("First name is required"),
          last_name: yup.string().required("Last name is required"),
          cin_number: yup.string().required("Identity number is required"),
          school_id: yup.string().required("Your school id is required"),
        })}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          const handleChange = (e, { name, value }) =>
            setFieldValue(name, value);
          return (
            <Modal
              closeIcon
              open={open}
              trigger={theTrigger}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header icon="user" content="Create profile" />
              <Modal.Content>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="first_name"
                      required
                      control={Input}
                      label="First name"
                      placeholder="First name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.first_name && errors.first_name}
                    />
                    <Form.Field
                      name="last_name"
                      required
                      control={Input}
                      label="Last name"
                      placeholder="Last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.last_name && errors.last_name}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="middle_name"
                      control={Input}
                      label="Middle name"
                      placeholder="Middle name"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Select}
                      options={genderOptions}
                      label={{
                        children: "Gender",
                        htmlFor: "form-select-control-gender",
                      }}
                      placeholder="Gender"
                      search
                      searchInput={{ id: "form-select-control-gender" }}
                      name="gender"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Field
                      name="school_id"
                      required
                      control={Input}
                      label="School ID"
                      placeholder="School ID"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.school_id && errors.school_id}
                    />
                    <Form.Field
                      control={Select}
                      options={days}
                      label={{ children: "Day", htmlFor: "birth_day" }}
                      searchInput={{ id: "birth_day" }}
                      search
                      name="birth_day"
                      placeholder="Birth day"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Select}
                      options={months}
                      label={{ children: "Month", htmlFor: "birth_day" }}
                      searchInput={{ id: "birth_month" }}
                      search
                      name="birth_month"
                      placeholder="Birth month"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Select}
                      options={years}
                      label={{ children: "Years", htmlFor: "birth_year" }}
                      searchInput={{ id: "birth_year" }}
                      search
                      name="birth_year"
                      placeholder="Birth year"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="cin_number"
                      control={Input}
                      label="CIN number"
                      placeholder="National identity number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.cin_number && errors.cin_number}
                    />
                    <Form.Field
                      name="passport_number"
                      control={Input}
                      label="Passport number"
                      placeholder="Passport number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Field
                    name="about_me"
                    control={TextArea}
                    label="About me"
                    placeholder="Write something about you"
                    onChange={handleChange}
                  />
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> Cancel
                </Button>
                <Button color="green" onClick={handleSubmit}>
                  <Icon name="checkmark" /> Add
                </Button>
              </Modal.Actions>
            </Modal>
          );
        }}
      />
    </>
  );
};

export default AddProfile;
