import React, {useState} from 'react'
import {Button, Header, Icon, Modal, Form, Input, TextArea, Select} from 'semantic-ui-react'
import UserService from '../../../services/user_service'
import {toaster} from "evergreen-ui";

const AddAboutMe = ({theTrigger}) => {
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

export default AddAboutMe