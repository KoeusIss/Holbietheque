/**
 * Create or edit certificate
 */
import React, {useState} from "react";
import Certificate from "../../../models/certificate";
import StudentService from "../../../services/student_service";
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
 * create or edit component modal
 * @param {JSX.Element} theTrigger
 * @param {string} student_id
 * @param {object} certificate
 * @returns {JSX.Element}
 * @constructor
 */
const CreateEditCertificate = ({theTrigger, student_id = null, certificate = null}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const _cs = new StudentService("certificates");
  const createMode = !certificate
  
  // Initial values either available data or crate new
  const initialValues = certificate || new Certificate()
  
  /**
   * create new certificate
   * @param {object} values
   */
  const createCertificate = (values) => {
    console.log(values);
    setLoading(true);
    _cs.create(values, student_id).then(
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
   * update a certificate
   * @param {object} values
   */
  const updateCertificate = (values) => {
    console.log(values);
    setLoading(true);
    _cs.update(values, certificate.id).then(
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
    createMode ? createCertificate(values) : updateCertificate(values)
  }
  
  /**
   * Validation rules schema
   */
  const validationSchema = yup.object().shape({
    name: yup.string().required("Certificate name is required"),
    authority: yup.string().required("Authority issued is required"),
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
              icon="certificate"
              content={(createMode ? "Create" : "Update") + " certificate"}
            />
            <Modal.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    name="name"
                    required
                    value={values.name}
                    label="Certificate name"
                    placeholder="Certificate name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                  />
                  <Form.Input
                    name="authority"
                    required
                    value={values.authority}
                    label="Authority"
                    placeholder="Authority"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.authority && errors.authority}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <DateInput
                    name="issued_at"
                    label="Issue date"
                    dateFormat={"YYYY-MM-DD"}
                    placeholder="Date"
                    value={values.issued_at}
                    iconPosition="left"
                    onChange={(e, {value}) => {
                      setFieldValue("issued_at", value)
                      values.issued_at = value
                    }}
                    error={touched.issued_at && errors.issued_at}
                  />
                  <DateInput
                    name="expired_at"
                    label="Expire date"
                    dateFormat={"YYYY-MM-DD"}
                    placeholder="Date"
                    value={values.expired_at}
                    iconPosition="left"
                    onChange={(e, {value}) => {
                      setFieldValue("expired_at", value)
                      values.expired_at = value
                    }}
                    error={touched.expired_at && errors.expired_at}
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

export default CreateEditCertificate;
