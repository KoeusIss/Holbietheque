/**
 * Add or edit section modal
 */
import React, {useEffect, useState} from "react";
import Recruiter from "../index";
import RecruiterService from "../../../services/recruiter_service";
import * as yup from "yup";
import {Formik, Field} from "formik";
import {toaster} from "evergreen-ui";
import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
  TextArea
} from "semantic-ui-react";

/**
 * AddEditSection modal for updating or creating section
 * @param {JSX.Element} theTrigger modal trigger
 * @param {Object} recruiter object for recruiter attribute
 * @param {boolean} createMode indicate Edit/Create mode
 * @param {string} section indicate section name
 * @returns {JSX.Element}
 * @constructor
 */
const AddEditSection = ({theTrigger, recruiter, createMode, section}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({})
  const sectionName = {
    'about': 'About',
    'core_values': 'Core values',
    'our_mission': 'Our mission',
    'interview_process': 'Interview process'
  }
  const successMsg = createMode
    ? `${sectionName[section]} section created successfully`
    : `${sectionName[section]} section updated successfully`
  
  /**
   * Recruiter initial value instance
   * @type Recruiter
   */
  useEffect(() => {
    Object.assign(data, {[section]: recruiter[section]})
  }, [recruiter])
  
  /**
   * Submit a create request in order to receive a success message
   * @param {object} values collected values from Formik form
   */
  const onSubmit = (values) => {
    setLoading(true);
    RecruiterService.update(values, recruiter.id).then(
      () => {
        setLoading(false);
        setOpen(false);
        toaster.success(successMsg, {duration: 5});
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setOpen(false);
        toaster.notify(message, {duration: 5});
      }
    );
  }
  
  /**
   * Validation schema shape
   */
  const validationSchema = yup.object().shape({
    [section]: yup.string().max(1024, "You should not exceed 1024 character")
  })
  
  return (
    <>
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={({
                   errors,
                   touched,
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
              <Header icon="industry"
                      content={createMode ? `Add ${sectionName[section]} section` : `Edit ${sectionName[section]} section`}/>
              <Modal.Content>
                <Form>
                  <Field
                    style={{height: "40vh"}}
                    as={TextArea}
                    name={section}
                    label={`${sectionName[section]} of the company`}
                    placeholder="Write something describing the company "
                    error={touched[section] && errors[section]}
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
      />
    </>
  )
    ;
}
export default AddEditSection