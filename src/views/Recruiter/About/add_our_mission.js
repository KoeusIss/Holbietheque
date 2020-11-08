import React, {useState} from "react";
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";
import Recruiter from "../index";
import RecruiterService from "../../../services/recruiter_service";
import {toaster} from "evergreen-ui";
import * as yup from "yup";
import {Formik} from "formik";

const AddOurMission = ({theTrigger, user_id}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  
  /**
   * Recruiter initial value instance
   * @type Recruiter
   */
  const initialValue = {
    our_mission: ""
  }
  /**
   * Submit a create request in order to receive a success message
   * @param {object} values collected values from Formik form
   */
  const onSubmit = (values) => {
    setLoading(true);
    RecruiterService.update(values, user_id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        toaster.notify(response.data.message, {duration: 5});
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
        toaster.notify(message, {duration: 5});
      }
    );
  }
  
  /**
   * Validation schema shape
   */
  const validationSchema = yup.object().shape({
    our_mission: yup.string().max(1024, "You should not exceed 1024 character")
  })
  
  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={({
                   values,
                   errors,
                   touched,
                   handleBlur,
                   handleSubmit,
                   setFieldValue,
                 }) => {
          const handleChange = (e, {name, value}) => {
            setFieldValue(name, value);
          }
          return (
            <Modal
              closeIcon
              open={open}
              trigger={theTrigger}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header icon="industry" content="Add our mission section"/>
              <Modal.Content>
                <Form>
                  <Form.TextArea
                    name="our_mission"
                    label="Company mission"
                    placeholder="Write about your company mission"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.our_mission && errors.our_mission}
                  />
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove"/> Cancel
                </Button>
                <Button color="green" onClick={handleSubmit} loading={loading}>
                  <Icon name="checkmark"/> Add
                </Button>
              </Modal.Actions>
            </Modal>
          );
        }}
    />
</>
)
  ;
}
export default AddOurMission