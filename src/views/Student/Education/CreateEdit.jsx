/**
 * Education create or edit modal
 */
import React, {useState} from "react";
import StudentService from "../../../services/student_service";
import Education from "../../../models/education";
import {Formik} from "formik";
import * as yup from "yup";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import {toaster} from "evergreen-ui";
import {DateInput} from "semantic-ui-calendar-react";

/**
 * Create or Edit component
 * @param {JSX.Element} theTrigger
 * @param {string} student_id
 * @param {object} education
 * @returns {JSX.Element}
 * @constructor
 */
const CreateEditEducation = ({theTrigger, student_id, education = null}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const _es = new StudentService("educations");
  const createMode = !education
  
  // Initial values either available data or create new
  const initialValues = education || new Education()
  
  /**
   * Create new education
   * @param {object} values
   */
  const createEducation = (values) => {
    setLoading(true);
    _es.create(values, student_id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
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
        setOpen(false);
        toaster.danger(returnError, {duration: 5});
      }
    );
  }
  
  /**
   * Update an education
   * @param {object} values
   */
  const updateEducation = (values) => {
    setLoading(true);
    _es.update(values, education.id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
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
        setOpen(false);
        toaster.danger(returnError, {duration: 5});
      }
    );
  }
  
  /**
   * Switch between creation and update
   * @param {object} values
   */
  const onSubmit = (values) => {
    createMode ? createEducation(values) : updateEducation(values)
  }
  
  /**
   * Validation rules schema
   */
  const validationSchema = yup.object().shape({
    degree: yup.string().required("Degree name is required"),
    school: yup.string().required("School name is required"),
    start_at: yup.string().required("Starting date is required"),
  })
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
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
            <Header icon="book" content="Add education"/>
            <Modal.Content>
              <Form>
                <Form.Input
                  name="degree"
                  required
                  label="Degree name"
                  placeholder="Degree name"
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.degree && errors.degree}
                />
                <Form.Input
                  name="major"
                  label="Education major"
                  placeholder="Education major"
                  value={values.major}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.major && errors.major}
                />
                <Form.Input
                  name="school"
                  required
                  label="School"
                  placeholder="School name"
                  value={values.school}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.school && errors.school}
                />
                <Form.Group widths="equal">
                  <DateInput
                    name="start_at"
                    label="Education start"
                    dateFormat={"YYYY-MM-DD"}
                    placeholder="Date"
                    value={values.start_at}
                    iconPosition="left"
                    onChange={(e, {value}) => {
                      setFieldValue("start_at", value)
                      values.start_at = value
                    }}
                    error={touched.start_at && errors.start_at}
                  />
                  <DateInput
                    name="end_at"
                    label="Education end"
                    dateFormat={"YYYY-MM-DD"}
                    placeholder="Date"
                    value={values.end_at}
                    iconPosition="left"
                    onChange={(e, {value}) => {
                      setFieldValue("end_at", value)
                      values.end_at = value
                    }}
                  />
                </Form.Group>
                <Form.TextArea
                  name="description"
                  label="Description"
                  value={values.description}
                  placeholder="Education description"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
    </Formik>
  );
};
export default CreateEditEducation;
