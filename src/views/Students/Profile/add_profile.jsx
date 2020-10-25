import React, {useState} from 'react'
import {Button, Header, Icon, Modal, Form, Input, TextArea, Select} from 'semantic-ui-react'
import UserService from '../../../services/user_service'
import {toaster} from "evergreen-ui";

const Add_profile = ({theTrigger}) => {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        school_id: '',
        date_of_birth: '',
        gender: '',
        cin_number: '',
        passport_number: '',
        about_me: ''
    })
    const [loginError, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false)
    const genderOptions = [
        {key: 'm', text: 'Male', value: 'male'},
        {key: 'f', text: 'Female', value: 'female'},
        {key: 'o', text: 'Other', value: 'other'},
    ]
    const maritalStatus = [
        {key: 'm', text: 'Married', value: 'married'},
        {key: 's', text: 'Single', value: 'single'},
        {key: 'o', text: 'Other', value: 'other'},
    ]
    const current_id = UserService.currentUser().id

    const handleChange = (event) => {
        event.preventDefault();
        setProfile({...profile, [event.target.name]: event.target.value});
    };

    const handleSubmit = () => {
        setLoading(true);
        UserService.postStudentProfile(profile, current_id).then(
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
            <Header icon='user' content='Add profile'/>
            <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name='first_name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                            onChange={handleChange}
                        />
                        <Form.Field
                            name='last_name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            onChange={handleChange}
                        />
                        <Form.Field
                            name='middle_name'
                            control={Input}
                            label='Middle name'
                            placeholder='Middle name'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name='school_id'
                            control={Input}
                            label='School ID'
                            placeholder='School ID'
                            onChange={handleChange}
                        />

                        <Form.Field
                            control={Select}
                            options={genderOptions}
                            label={{children: 'Gender', htmlFor: 'form-select-control-gender'}}
                            placeholder='Gender'
                            search
                            searchInput={{id: 'form-select-control-gender'}}
                            name='gender'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name='date_of_birth'
                            control={Input}
                            label='Date of birth'
                            placeholder='Date of birth'
                            onChange={handleChange}
                        />

                        <Form.Field
                            name='cin_number'
                            control={Input}
                            label='CIN number'
                            placeholder='National identity number'
                            onChange={handleChange}
                        />
                        <Form.Field
                            name='passport_number'
                            control={Input}
                            label='Passport number'
                            placeholder='Passport number'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Field
                        name='about_me'
                        control={TextArea}
                        label='About me'
                        placeholder='Write something about you'
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

export default Add_profile