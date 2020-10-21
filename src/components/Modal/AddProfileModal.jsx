import React, {useState} from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea, Select } from 'semantic-ui-react'

const AddProfileModal = ({theTrigger}) => {
  const [open, setOpen] = React.useState(false)
    const genderOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
      { key: 'o', text: 'Other', value: 'other' },
    ]
  const maritalStatus = [
      { key: 'm', text: 'Married', value: 'married' },
      { key: 's', text: 'Single', value: 'single' },
      { key: 'o', text: 'Other', value: 'other' },
    ]

  return (
    <Modal
      closeIcon
      open={open}
      trigger={theTrigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='book' content='Setting up profile' />
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='First name'
              placeholder='First name'
            />
            <Form.Field
              id='form-input-control-last-name'
              control={Input}
              label='Last name'
              placeholder='Last name'
            />
            <Form.Field
              control={Select}
              options={genderOptions}
              label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
              placeholder='Gender'
              search
              searchInput={{ id: 'form-select-control-gender' }}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='School ID'
              placeholder='School ID'
            />

            <Form.Field
              control={Select}
              options={maritalStatus}
              label={{ children: 'Marital status', htmlFor: 'form-select-control-status' }}
              placeholder='Marital status'
              search
              searchInput={{ id: 'form-select-control-status' }}
            />
          </Form.Group>
          <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label='About me'
            placeholder='Write something about you'
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddProfileModal