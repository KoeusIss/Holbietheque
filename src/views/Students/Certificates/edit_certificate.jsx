import React, {useState} from 'react'
import StudentService from "../../../services/student_service";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Checkbox
} from 'semantic-ui-react'
import {toaster} from "evergreen-ui";


const EditCertificate = ({theTrigger, data}) => {
  const [expire, setExpire] = useState(false)
  const [certificate, setCertificate] = useState(data)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false)
  const certificateService = new StudentService("certificates")

  const handleChange = (event) => {
    event.preventDefault();
    setCertificate({...certificate, [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    setLoading(true);
    certificateService.update(certificate).then(
      (response) => {
        setLoading(false);
        setOpen(false)
        toaster.notify(response.data.message, {duration: 5})
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
              value={certificate.name}
            />
            <Form.Field
              name='authority'
              control={Input}
              label='Authority'
              placeholder='Issued by ..'
              onChange={handleChange}
              value={certificate.authority}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              name='issued_at'
              control={Input}
              label='Issue date'
              placeholder='Issue date'
              onChange={handleChange}
              value={certificate.issued_at}
            />

            <Form.Field
              name='expired_at'
              control={Input}
              label='Expire date'
              placeholder='Expire date'
              onChange={handleChange}
              disabled={expire}
              value={certificate.expired_at}
            />

          </Form.Group>
          <Form.Field
            name='is_expire'
            label='Never expire'
            control={Checkbox}
            onClick={() => setExpire(!expire)}
            onChange={handleChange}
            value={certificate.is_expire}
          />
          <Form.Field
            name='description'
            control={TextArea}
            label='Description'
            placeholder='What about the certificate..'
            onChange={handleChange}
            value={certificate.description}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove'/> Cancel
        </Button>
        <Button color='green' onClick={handleSubmit} loading={loading}>
          <Icon name='checkmark'/> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditCertificate
