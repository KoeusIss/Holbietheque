import React, { useState } from "react";
import Language from "../../../models/language";
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
import { communLangs, levels } from "../../../components/Options";

const AddLanguage = ({ theTrigger, student_id }) => {
  const [language, setLanguage] = useState(new Language());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const languageService = new StudentService("languages");

  return (
    <>
      <Formik
        initialValues={new Language()}
        onSubmit={(values) => {
          console.log("from language: " + student_id);
          setLoading(true);
          languageService.create(values, student_id).then(
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
          setFieldValue,
          handleBlur,
          handleSubmit,
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
              <Header icon="user" content="Add profile" />
              <Modal.Content>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field
                      control={Select}
                      options={communLangs}
                      label={{
                        children: "Language",
                        htmlFor: "form-select-control-language",
                      }}
                      placeholder="Language"
                      search
                      searchInput={{ id: "form-select-control-language" }}
                      name="language"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Select}
                      options={levels}
                      label={{
                        children: "Level",
                        htmlFor: "form-select-control-level",
                      }}
                      placeholder="Level"
                      search
                      searchInput={{ id: "form-select-control-level" }}
                      name="level"
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

export default AddLanguage;
