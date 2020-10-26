import React, { useState } from "react";
import Address from "../../../models/address";
import StudentService from "../../../services/student_service";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { countries, states } from "../../../components/Options";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  Select,
} from "semantic-ui-react";
import { toaster } from "evergreen-ui";

const AddAddress = ({ theTrigger, student_id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const addressService = new StudentService("address");

  return (
    <>
      <Formik
        initialValues={new Address()}
        onSubmit={(values) => {
          console.log(values);
          setLoading(true);
          addressService.create(values, student_id).then(
            (response) => {
              setLoading(false);
              setOpen(false);
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
          first_line: yup.string().required("First line is required"),
          city: yup.string().required("City name is required"),
          zip_code: yup.string().required("Zip code is required"),
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
              <Header icon="mark" content="Add address" />
              <Modal.Content>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="first_line"
                      required
                      control={Input}
                      label="First line"
                      placeholder="Address first line"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.first_line && errors.first_line}
                    />
                    <Form.Field
                      name="second_line"
                      control={Input}
                      label="Second line"
                      placeholder="Address second line"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      control={Select}
                      options={states}
                      label={{
                        children: "State",
                        htmlFor: "form-select-control-state",
                      }}
                      placeholder="State"
                      search
                      searchInput={{ id: "form-select-control-state" }}
                      name="state_id"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Select}
                      options={countries}
                      label={{
                        children: "Country",
                        htmlFor: "form-select-control-country",
                      }}
                      placeholder="Country"
                      search
                      searchInput={{ id: "form-select-control-country" }}
                      name="country_id"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="city"
                      control={Input}
                      label="City"
                      placeholder="Your city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && errors.city}
                    />
                    <Form.Field
                      name="zip_code"
                      control={Input}
                      label="Postal code"
                      placeholder="Your postal code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.zip_code && errors.zip_code}
                    />
                  </Form.Group>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> Cancel
                </Button>
                <Button
                  color="green"
                  onClick={handleSubmit}
                  loading={loading}
                  type="button"
                >
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

export default AddAddress;
