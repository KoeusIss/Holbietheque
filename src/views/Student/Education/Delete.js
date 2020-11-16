/**
 * Delete confirmation modal
 */
import React from 'react'
import {toaster} from "evergreen-ui";
import {
  Button,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react'
import StudentService from "../../../services/student_service";

/**
 * Delete confirmation modal component
 * @param {JSX.Element} theTrigger
 * @param {object} education
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteModal = ({theTrigger, education}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const _es = new StudentService("educations")
  
  const successMsg = "Education deleted successfully"
  
  const handleClick = () => {
    setLoading(true);
    _es.delete(education.id).then(
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
        toaster.danger(message, {duration: 5});
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
        Did you confirm deleting {education.degree} {education.major} section?
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
