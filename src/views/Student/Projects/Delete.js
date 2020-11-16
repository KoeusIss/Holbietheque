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
 * @param {object} project
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteModal = ({theTrigger, project}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const _ps = new StudentService("project")
  
  const successMsg = "Project deleted successfully"
  
  // handle delete action
  const handleClick = () => {
    setLoading(true);
    _ps.delete(project.id).then(
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
        Did you confirm deleting {project.name} project?
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
