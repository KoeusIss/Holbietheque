// Projects create modal

import React, { useState } from "react";
import Project from "../../../models/project";
import StudentService from "../../../services/student_service";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import { toaster } from "evergreen-ui";
import { Formik } from "formik";
import * as yup from "yup";

const AddProject = ({ theTrigger, student_id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const projectService = new StudentService("projects");

  return (
    <>
      <Formik
        initialValues={new Project()}
        onSubmit={(values) => {
          console.log(values);
          setLoading(true);
          projectService.create(values, student_id).then(
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
          name: yup.string().required("Project name is required"),
          start_at: yup.string().required("Project starting date is required"),
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
              <Header icon="book" content="Add education" />
              <Modal.Content>
                <Form>
                  <Form.Field
                    name="name"
                    control={Input}
                    label="Project name"
                    required
                    placeholder="Project name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                  />
                  <Form.Group widths="equal">
                    <Form.Field
                      name="start_at"
                      required
                      control={Input}
                      label="Start date"
                      placeholder="Project start date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.start_at && errors.start_at}
                    />
                    <Form.Field
                      name="end_at"
                      control={Input}
                      label="End date"
                      placeholder="Project end date"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Field
                    name="url"
                    control={Input}
                    label="Project link"
                    placeholder="http://example.com"
                    onChange={handleChange}
                  />
                  <Form.Field
                    name="github_link"
                    control={Input}
                    label="Github link"
                    placeholder="http://github.com/me/project"
                    onChange={handleChange}
                  />
                  <Form.Field
                    name="description"
                    control={TextArea}
                    label="Description"
                    placeholder="What about the your experience.."
                    onChange={handleChange}
                  />
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

export default AddProject;
