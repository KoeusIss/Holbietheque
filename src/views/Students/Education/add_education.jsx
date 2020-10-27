// Add education modal

import React, { useState } from "react";
import StudentService from "../../../services/student_service";
import Education from "../../../models/education";
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

const AddEducation = ({ theTrigger, student_id }) => {
  const [finshed, setFinshed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [education, setEducation] = useState(new Education());
  const educationService = new StudentService("education");

  const months = [
    { key: "1", text: "January", value: "01" },
    { key: "2", text: "February", value: "02" },
    { key: "3", text: "March", value: "03" },
    { key: "4", text: "April", value: "04" },
    { key: "5", text: "May", value: "05" },
    { key: "6", text: "June", value: "06" },
    { key: "7", text: "July", value: "07" },
    { key: "8", text: "August", value: "08" },
    { key: "9", text: "September", value: "09" },
    { key: "10", text: "October", value: "10" },
    { key: "11", text: "November", value: "11" },
    { key: "12", text: "December", value: "12" },
  ];

  let years = [];
  let i = 0;
  while (i < 100) {
    years.push({
      key: i,
      text: (1990 + i).toString(),
      value: (1990 + i).toString(),
    });
    i++;
  }

  return (
    <>
      <Formik
        initialValues={new Education()}
        onSubmit={(values) => {
          setLoading(true);
          educationService.create(values, student_id).then(
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
          degree: yup.string().required("Degree name is required"),
          school: yup.string().required("School name is required"),
          start_at: yup.string().required("Starting date is required"),
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
                    name="degree"
                    required
                    control={Input}
                    label="Degree name"
                    placeholder="Degree name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Field
                    name="major"
                    control={Input}
                    label="Education major"
                    placeholder="Education major"
                    onChange={handleChange}
                  />
                  <Form.Field
                    name="school"
                    required
                    control={Input}
                    label="School"
                    placeholder="School name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Group widths="equal"></Form.Group>
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
                    onClick={() => setFinshed(!finshed)}
                    onChange={handleChange}
                  />
                  <Form.Field
                    name="description"
                    control={TextArea}
                    label="Description"
                    placeholder="What about the education.."
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
export default AddEducation;
