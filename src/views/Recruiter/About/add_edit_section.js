/**
 * Add or edit section modal
 */
import React, {useEffect, useState} from "react";
import Recruiter from "../index";
import RecruiterService from "../../../services/recruiter_service";
import {toaster} from "evergreen-ui";
import {
  Button,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import MDEditor from '@uiw/react-md-editor';

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
  const sectionName = {
    'about': 'About',
    'core_values': 'Core values',
    'our_mission': 'Our mission',
    'interview_process': 'Interview process'
  }
  const successMsg = createMode
    ? `${sectionName[section]} section created successfully`
    : `${sectionName[section]} section updated successfully`
  const [value, setValue] = React.useState("");
  
  /**
   * Recruiter initial value instance
   * @type Recruiter
   */
  useEffect(() => {
    !createMode && setValue(recruiter[section])
  }, [])
  
  /**
   * Submit a create request in order to receive a success message
   * @param {object} values collected values from Formik form
   */
  const onSubmit = () => {
    setLoading(true);
    RecruiterService.update({[section]: value}, recruiter.id).then(
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
  
  return (
    <Modal
      closeIcon
      size="large"
      open={open}
      trigger={theTrigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="industry"
              content={createMode ? `Add ${sectionName[section]} section` : `Edit ${sectionName[section]} section`}/>
      <Modal.Content>
        <MDEditor
          value={value}
          onChange={setValue}
          height={500}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove"/> Cancel
        </Button>
        <Button color="green" onClick={onSubmit} loading={loading}>
          <Icon name="checkmark"/> {createMode ? "Create" : "Update"}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
export default AddEditSection