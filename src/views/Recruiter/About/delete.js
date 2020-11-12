/**
 * Delete confirmation modal
 */
import React from 'react'
import RecruiterService from "../../../services/recruiter_service";
import {toaster} from "evergreen-ui";
import {
  Button,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react'

/**
 * Delete confirmation modal component
 * @param {JSX.Element} theTrigger
 * @param {string} section
 * @param {object} recruiter
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteModal = ({theTrigger, section, recruiter}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const emptyData = {[section]: null}
  const sectionName = {
    'about': 'About',
    'core_values': 'Core values',
    'our_mission': 'Our mission',
    'interview_process': 'Interview process'
  }
  const successMsg = sectionName[section] + " section deleted successfully"
  
  const handleClick = () => {
    setLoading(true);
    RecruiterService.update(emptyData, recruiter.id).then(
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
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={theTrigger}
    >
      <Header icon>
        <Icon name='trash'/>
        Did you confirm deleting the '{sectionName[section]}' section?
      </Header>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove'/> No
        </Button>
        <Button color='green' inverted onClick={handleClick} loading={loading}>
          <Icon name='checkmark'/> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal
