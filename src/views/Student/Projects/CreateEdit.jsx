/**
 * Projects create or edit modal
 */
import React, {useState} from "react";
import Project from "../../../models/project";
import StudentService from "../../../services/student_service";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import {toaster} from "evergreen-ui";
import {Formik} from "formik";
import * as yup from "yup";
import {DateInput} from "semantic-ui-calendar-react";

/**
 * Create or edit project modal component
 * @param {JSX.Element} theTrigger
 * @param {string|null} student_id
 * @param {string|null} project
 * @returns {JSX.Element}
 * @constructor
 */
const CreateEditProject = ({theTrigger, student_id = null, project = null}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const _ps = new StudentService("projects");
  const createMode = !project
  
  // Initial values either available data or crate new
  const initialValues = project || new Project()
  
  /**
   * Create project
   * @param {object} values
   */
  const createProject = (values) => {
    setLoading(true);
    _ps.create(values, student_id).then(
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
   * update project
   * @param {object} values
   */
  const updateProject = (values) => {
    setLoading(true);
    _ps.update(values, project.id).then(
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
    createMode ? createProject(values) : updateProject(values)
  }
  
  /**
   * Validation rules schema
   */
  const validationSchema = yup.object().shape({
    name: yup.string().required("Project name is required"),
    start_at: yup.string().required("Project starting date is required"),
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
          handleSubmit,
          setFieldValue
        }) => {
        return (
          <Modal
            closeIcon
            open={open}
            trigger={theTrigger}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header
              icon="book"
              content={(createMode ? "Create" : "Update") + " Experience"}
            />
            <Modal.Content>
              <Form>
                <Form.Input
                  name="name"
                  label="Project name"
                  required
                  placeholder="Project name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                />
                <Form.Group widths="equal">
                  <DateInput
                    name="start_at"
                    label="Project start"
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
                    label="Project end"
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
                <Form.Input
                  name="url"
                  label="Project link"
                  value={values.url}
                  placeholder="http://example.com"
                  onChange={handleChange}
                />
                <Form.Input
                  name="github_link"
                  label="Github link"
                  value={values.github_link}
                  placeholder="http://github.com/me/project"
                  onChange={handleChange}
                />
                <Form.TextArea
                  name="description"
                  label="Description"
                  value={values.description}
                  placeholder="Project description"
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

export default CreateEditProject;
