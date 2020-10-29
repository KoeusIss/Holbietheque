import React, { useState } from "react";
import Language from "../../../models/links";
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
import StudentService from "../../../services/student_service";
import { toaster } from "evergreen-ui";
import { Formik } from "formik";
import Certificate from "../../../models/certificate";
import * as yup from "yup";

const AddLanguages = ({ theTrigger, student_id }) => {
  const [socialLink, setSocialLink] = useState(new Language());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const languagesService = new StudentService("languages");

  return (
    <>
      <Formik
        initialValues={new Language()}
        onSubmit={(values) => {
          console.log("from languages: " + student_id);
          setLoading(true);
          languagesService.create(values, student_id).then(
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
              <Header icon="user" content="Add profile" />
              <Modal.Content>
                <Form>
                  <Form.Group>
                    <Form.Field
                      name="Mother tongue"
                      control={Input}
                      label="lanugage"
                      placeholder="EN"
                      onChange={handleChange}
                    />
                    <Form.Field
                      name="Second language"
                      control={Input}
                      label="lanugage"
                      placeholder="FR"
                      onChange={handleChange}
                    />
                    <Form.Field
                      name="Third language"
                      control={Input}
                      label="lanugage"
                      placeholder="AR"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> Cancel
                </Button>
                <Button color="green" onClick={handleSubmit} loading={loading}>
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

export default AddLanguages;
