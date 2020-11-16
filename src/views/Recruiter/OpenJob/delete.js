/**
 * Delete confirmation modal
 */
import React from 'react'
import JobService from "../../../services/job_service";
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
 * @param {object} job
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteModal = ({theTrigger, job}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const successMsg = job.title + " job deleted successfully"
  
  const handleClick = () => {
    setLoading(true);
    JobService.delete(job.id).then(
      () => {
        setLoading(false);
        setOpen(false);
        toaster.success(successMsg, {duration: 5});
      },
      (error) => {
        setLoading(false)
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
        Did you confirm deleting the '{job.title}' job?
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
