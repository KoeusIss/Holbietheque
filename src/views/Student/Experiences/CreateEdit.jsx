/**
 * Experience create or edit modal
 */
import React, {useState} from "react";
import StudentService from "../../../services/student_service";
import Experience from "../../../models/experience";
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
import {jobTypes} from "../../../components/Options";
import {DateInput} from "semantic-ui-calendar-react";


/**
 * Create or edit experience modal component
 * @param {JSX.Element} theTrigger
 * @param {string} student_id
 * @param {object} experience
 * @returns {JSX.Element}
 * @constructor
 */
const CreateEditExperience = ({theTrigger, student_id, experience = null}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const _es = new StudentService("experiences");
  const createMode = !experience
  
  // Initial values either available data or crate new
  const initialValues = experience || new Experience()
  
  /**
   * Create new experience
   * @param {object} values
   */
  const createExperience = (values) => {
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
   * update experience
   * @param {object} values
   */
  const updateExperience = (values) => {
    setLoading(true);
    _es.update(values, experience.id).then(
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
    createMode ? createExperience(values) : updateExperience(values)
  }
  
  /**
   * Validation rules schema
   */
  const validationSchema = yup.object().shape({
    title: yup.string().required("Job title is required"),
    company: yup.string().required("Company name is required"),
  })
  
  // Renderer
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
            <Header icon="briefcase" content={(createMode ? "Create" : "Update") + " Experience"}/>
            <Modal.Content>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    name="title"
                    required
                    label="Job title"
                    placeholder="Job title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && errors.title}
                  />
                  <Form.Select
                    options={jobTypes}
                    value={values.job_type}
                    label={{
                      children: "Job Type",
                      htmlFor: "form-select-control-job-type",
                    }}
                    placeholder="Job Type"
                    search
                    searchInput={{id: "form-select-control-job-type"}}
                    name="job_type"
                    onChange={(e, {value}) => {
                      setFieldValue("job_type", value)
                      values.job_type = value
                    }}
                  />
                </Form.Group>
                <Form.Input
                  name="company"
                  required
                  label="Company name"
                  placeholder="Company name"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.company && errors.company}
                />
                <Form.Group widths="equal">
                  <DateInput
                    name="start_at"
                    label="Position start"
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
                    label="Position end"
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
                  placeholder="Experience description"
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
                <Icon name="checkmark"/> {createMode ? "Create" : "Update"}
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default CreateEditExperience;
