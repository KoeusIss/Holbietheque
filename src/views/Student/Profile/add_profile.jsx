/**
 * Add or Edit modal
 */
import React, {useState} from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form
} from "semantic-ui-react";
import UserService from "../../../services/user_service";
import {toaster} from "evergreen-ui";
import * as yup from "yup";
import {Formik} from "formik";
import AStudent from "../../../models/student";
import {useHistory} from "react-router-dom";
import {genderOptions} from "../../../components/Options";
import StudentService from "../../../services/student_service";

/**
 * Add or edit student
 * @param {JSX.Element} theTrigger
 * @param {object} student
 * @param {string} userID
 * @returns {JSX.Element}
 * @constructor
 */
const AddEditProfile = ({theTrigger, student = null, userID}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const createMode = !student
  const _ss = new StudentService('students')
  
  // Initial values
  const initialValues = student || new AStudent()
  
  /**
   * Update student function
   * @param {object} values
   */
  const updateStudent = (values) => {
    setLoading(true);
    _ss.update(values, student.id).then(
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
   * Create a new student
   * @param {object} values
   */
  const createStudent = (values) => {
    setLoading(true);
    UserService.create(values, userID).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        localStorage.setItem("access_token", response.data.access_token);
        history.push("/students/" + response.data.student.id);
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
    createMode ? createStudent(values) : updateStudent(values)
  }
  
  /**
   * Validation rules schema
   */
  const validationSchema = yup.object().shape({
    first_name: yup.string()
      .required("First name is required")
      .min(3, "First name is too short"),
    last_name: yup.string()
      .required("Last name is required")
      .min(3, "Last name is too short"),
    cin_number: yup.string()
      .required("Identity number is required")
      .matches(/^[0-9]{8}$/, "Enter a valid Identity number"),
    school_id: yup.string()
      .required("Your school id is required")
      .matches(/^[0-9]{4}$/, "Enter a valid School id"),
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
          handleBlur,
          handleSubmit,
          handleChange
        }) => {
        return (
          <Modal
            closeIcon
            open={open}
            trigger={theTrigger}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header icon="user" content={(createMode ? "Create" : "Update") + ' profile'}/>
            <Modal.Content>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    name="first_name"
                    required
                    value={values.first_name}
                    label="First name"
                    placeholder="First name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && errors.first_name}
                  />
                  <Form.Input
                    name="last_name"
                    required
                    value={values.last_name}
                    label="Last name"
                    placeholder="Last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && errors.last_name}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    name="middle_name"
                    label="Middle name"
                    value={values.middle_name}
                    placeholder="Middle name"
                    onChange={handleChange}
                  />
                  <Form.Select
                    name="gender"
                    options={genderOptions}
                    label={{
                      children: "Gender",
                      htmlFor: "form-select-control-gender",
                    }}
                    placeholder="Gender"
                    search
                    searchInput={{id: "form-select-control-gender"}}
                    onChange={(e, {value}) => {
                      values.gender = value
                    }}
                    value={values.gender}
                  />
                </Form.Group>
                <Form.Group widths={"equal"}>
                  <Form.Input
                    name="school_id"
                    required
                    label="School ID"
                    placeholder="9999"
                    value={values.school_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.school_id && errors.school_id}
                  />
                  <Form.Input
                    name="phone_number"
                    required
                    label="Phone number"
                    placeholder="00345678"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone_number && errors.phone_number}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    name="cin_number"
                    required
                    value={values.cin_number}
                    label="CIN number"
                    placeholder="00000000"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cin_number && errors.cin_number}
                  />
                  <Form.Input
                    name="passport_number"
                    label="Passport number"
                    placeholder="X00000000"
                    value={values.passport_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.passport_number && errors.passport_number}
                  />
                </Form.Group>
                <Form.TextArea
                  name="about_me"
                  label="About me"
                  value={values.about_me}
                  placeholder="Who are you?"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)} type="button">
                <Icon name="remove"/> Cancel
              </Button>
              <Button color="green" onClick={handleSubmit} type="submit" loading={loading}>
                <Icon name="checkmark"/> {createMode ? "Create" : "Update"}
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default AddEditProfile;
