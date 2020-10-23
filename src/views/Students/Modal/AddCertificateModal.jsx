import React, {useState} from 'react'
import {Button, Header, Icon, Modal, Form, Input, TextArea, Select, Checkbox} from 'semantic-ui-react'
import UserService from '../../../services/user_service'
import {toaster} from "evergreen-ui";

const AddCertificateModal = ({theTrigger, student_id}) => {
  const [expire, setExpire] = useState(false)
  const [certifiacte, setCertificate] = useState({
    name: '',
    authority: '',
    is_expire: expire,
    issued_at: '',
    expired_at: '',
    certificate_id: '',
    description: ''
  })
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false)
  const current_id = UserService.currentUser().id

  const handleChange = (event) => {
    event.preventDefault();
    setCertificate({...certifiacte, [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    setLoading(true);
    UserService.postStudentCertificate(certifiacte, student_id).then(
      () => {
        setLoading(false);
        setOpen(false)
        toaster.notify("Added successfully", {duration: 5})
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setError(returnError);
        setOpen(false)
        toaster.notify(returnError, {duration: 5})
      }
    )
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={theTrigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='certificate' content='Add certificate'/>
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              name='name'
              control={Input}
              label='Certificate name'
              placeholder='Certificate name'
              onChange={handleChange}
            />
            <Form.Field
              name='authority'
              control={Input}
              label='Authority'
              placeholder='Issued by ..'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              name='issued_at'
              control={Input}
              label='Issue date'
              placeholder='Issue date'
              onChange={handleChange}
            />

            <Form.Field
              name='expired_at'
              control={Input}
              label='Expire date'
              placeholder='Expire date'
              onChange={handleChange}
              disabled={expire}
            />

          </Form.Group>
          <Form.Field
            name='is_expire'
            label='Never expire'
            control={Checkbox}
            onClick={() => setExpire(!expire)}
            onChange={handleChange}
          />
          <Form.Field
            name='description'
            control={TextArea}
            label='Description'
            placeholder='What about the certificate..'
            onChange={handleChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove'/> Cancel
        </Button>
        <Button color='green' onClick={handleSubmit}>
          <Icon name='checkmark'/> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddCertificateModal