import React, {useState} from 'react'
import StudentService from "../../../services/student_service";
import Experience from "../../../models/experience";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Select,
  Checkbox
} from 'semantic-ui-react'
import {toaster} from "evergreen-ui";

const EditExperience = ({theTrigger, data}) => {
  const [actual, setActual] = useState(false)
  const [experience, setExperience] = useState(data)
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false)
  const experienceService = new StudentService("experiences")

  const jobTypeOptions = [
    {key: 'f', text: 'Full time', value: 'Full time'},
    {key: 'p', text: 'Part time', value: 'Part time'},
    {key: 'l', text: 'Freelance', value: 'Freelance'},
    {key: 'a', text: 'Apprenticeship', value: 'Apprenticeship'},
    {key: 'i', text: 'Internship', value: 'Internship'}
  ]

  const handleChange = (event) => {
    event.preventDefault();
    setExperience({...experience, [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    setLoading(true);
    experienceService.update(experience).then(
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
      <Header icon='book' content='Edit experience'/>
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              name='title'
              control={Input}
              label='Job title'
              placeholder='Job title'
              onChange={handleChange}
              value={experience.title}
            />
            <Form.Field
              control={Select}
              options={jobTypeOptions}
              label={{children: 'Job Type', htmlFor: 'form-select-control-job-type'}}
              placeholder='Job Type'
              search
              searchInput={{id: experience.id}}
              name='job_type'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              name='company'
              control={Input}
              label='Company name'
              placeholder='Company name'
              onChange={handleChange}
              value={experience.company}
            />
            <Form.Field
              name='location'
              control={Input}
              label='Location'
              placeholder='Tunisia, France, Germany ...'
              onChange={handleChange}
              value={experience.location}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              name='start_at'
              control={Input}
              label='Start'
              placeholder='Started date'
              onChange={handleChange}
              value={experience.start_at}
            />

            <Form.Field
              name='end_at'
              control={Input}
              label='Finish'
              placeholder='Finish date'
              onChange={handleChange}
              disabled={actual}
            />

          </Form.Group>
          <Form.Field
            name='is_finished'
            label='Still at school?'
            control={Checkbox}
            onClick={() => setActual(!actual)}
            onChange={handleChange}
            value={experience.end_at}
          />
          <Form.Field
            name='description'
            control={TextArea}
            label='Description'
            placeholder='What about the your experience..'
            onChange={handleChange}
            value={experience.description}
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

export default EditExperience