import React, {useState} from "react";
import Address from "../../../models/address";
import StudentService from "../../../services/student_service";
import {Formik, Field} from "formik";
import * as yup from "yup";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Checkbox,
} from "semantic-ui-react"
import {toaster} from "evergreen-ui";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


const AddAddress = ({theTrigger, student_id}) => {
  const [expire, setExpire] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const addressService = new StudentService("address");

  return (
    <>
      <Formik
        initialValues={new Address()}
        onSubmit={(values) => {
          console.log(values)
          setLoading(true);
          addressService.create(values, student_id).then(
            (response) => {
              setLoading(false);
              setOpen(false);
              toaster.notify(response.data.message, {duration: 5});
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
              toaster.notify(returnError, {duration: 5});
            }
          );
        }}
        validationSchema={yup.object().shape({
          first_line: yup.string().required("First line is required"),
          city: yup.string().required("City name is required"),
          zip_code: yup.string().required("Zip code is required"),
          state: yup.string().required("State name is required"),
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
            <Modal
              closeIcon
              open={open}
              trigger={theTrigger}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header icon="certificate" content="Add certificate"/>
              <Modal.Content>
                <Form onSubmit={handleSubmit}>
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
                      required
                      control={Input}
                      label="Authority"
                      placeholder="Address second line"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      control={SemanticDatepicker}
                      label="Issued date"
                      name="issued_at"
                      placeholder="Date"
                      value={values.value}
                      iconPosition="left"
                      onChange={handleChange}
                    />

                    <Form.Field
                      control={SemanticDatepicker}
                      label="Expired date"
                      name="expired_at"
                      placeholder="Date"
                      value={values.value}
                      iconPosition="left"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Field
                    name="is_expire"
                    label="Never expire"
                    control={Checkbox}
                    onClick={() => setExpire(!expire)}
                    onChange={handleChange}
                  />
                  <Form.Field
                    name="description"
                    control={TextArea}
                    label="Description"
                    placeholder="What about the certificate.."
                    onChange={handleChange}
                  />
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove"/> Cancel
                </Button>
                <Button color="green" onClick={handleSubmit} loading={loading}>
                  <Icon name="checkmark"/> Add
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
