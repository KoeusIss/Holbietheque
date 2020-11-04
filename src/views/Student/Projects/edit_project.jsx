import React, {useState} from 'react'
import StudentService from "../../../services/student_service";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react'
import {toaster} from "evergreen-ui";


const EditProject = ({theTrigger, data}) => {

  const [project, setProject] = useState(data)
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const projectService = new StudentService('projects')

  const handleChange = (event) => {
    event.preventDefault();
    setProject({...project, [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    setLoading(true);
    projectService.update(project).then(
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
      <Header icon='book' content='Add education'/>
      <Modal.Content>
        <Form>
          <Form.Field
            name='name'
            control={Input}
            label='Project name'
            placeholder='Project name'
            onChange={handleChange}
            value={project.name}
          />
          <Form.Group widths='equal'>
            <Form.Field
              name='start_at'
              control={Input}
              label='Start date'
              placeholder='Project start date'
              onChange={handleChange}
              value={project.start_at}
            />
            <Form.Field
              name='end_at'
              control={Input}
              label='End date'
              placeholder='Project end date'
              onChange={handleChange}
              value={project.end_at}
            />
          </Form.Group>
          <Form.Field
            name='url'
            control={Input}
            label='Project link'
            placeholder='http://example.com'
            onChange={handleChange}
            value={project.url}
          />
          <Form.Field
            name='github_link'
            control={Input}
            label='Github link'
            placeholder='http://github.com/me/project'
            onChange={handleChange}
            value={project.github_link}
          />
          <Form.Field
            name='description'
            control={TextArea}
            label='Description'
            placeholder='What about the your experience..'
            onChange={handleChange}
            value={project.description}
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

export default EditProject