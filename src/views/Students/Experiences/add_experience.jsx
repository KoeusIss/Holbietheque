// Add education pane

import React, { useState } from "react";
import StudentService from "../../../services/student_service";
import Experience from "../../../models/experience";
import { Formik, Field } from "formik";
import * as yup from "yup";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Select,
  Checkbox,
} from "semantic-ui-react";
import { toaster } from "evergreen-ui";

const AddExperience = ({ theTrigger, student_id }) => {
  const [actual, setActual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [experience, setExperience] = useState(new Experience());
  const experienceService = new StudentService("experiences");

  const jobTypeOptions = [
    { key: "f", text: "Full time", value: "Full time" },
    { key: "p", text: "Part time", value: "Part time" },
    { key: "l", text: "Freelance", value: "Freelance" },
    { key: "a", text: "Apprenticeship", value: "Apprenticeship" },
    { key: "i", text: "Internship", value: "Internship" },
  ];

  return (
    <>
      <Formik
        initialValues={new Experience()}
        onSubmit={(values) => {
          setLoading(true);
          experienceService.create(values, student_id).then(
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
          title: yup.string().required("Job title is required"),
          company: yup.string().required("Company name is required"),
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
                  <Form.Group widths="equal">
                    <Form.Field
                      name="title"
                      required
                      control={Input}
                      label="Job title"
                      placeholder="Job title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.title && errors.title}
                    />
                    <Form.Field
                      control={Select}
                      options={jobTypeOptions}
                      label={{
                        children: "Job Type",
                        htmlFor: "form-select-control-job-type",
                      }}
                      placeholder="Job Type"
                      search
                      searchInput={{ id: "form-select-control-job-type" }}
                      name="job_type"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="company"
                      required
                      control={Input}
                      label="Company name"
                      placeholder="Company name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.company && errors.company}
                    />
                    <Form.Field
                      name="location"
                      control={Input}
                      label="Location"
                      placeholder="Tunisia, France, Germany ..."
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="start_at"
                      required
                      control={Input}
                      label="Start date"
                      placeholder="YYYY-MM-DD"
                      onChange={handleChange}
                    />

                    <Form.Field
                      name="end_at"
                      required
                      control={Input}
                      label="End date"
                      placeholder="YYYY-MM-DD"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Field
                    name="is_finished"
                    label="Still at school?"
                    control={Checkbox}
                    onClick={() => setActual(!actual)}
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

export default AddExperience;
