/**
 * Create or edit social links
 */
import React, {useState} from "react";
import SocialLink from "../../../models/links";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import StudentService from "../../../services/student_service";
import {toaster} from "evergreen-ui";
import {Formik} from "formik";

/**
 * Create or edit social links
 * @param {JSX.Element} theTrigger
 * @param {string|null} student_id
 * @param {string|null} socials
 * @returns {JSX.Element}
 * @constructor
 */
const CreateEditSocialLinks = ({theTrigger, student_id = null, socials = null}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const _sl = new StudentService("socials");
  const createMode = Object.keys(socials).length === 0
  
  // Initial values either available data or crate new
  const initialValues = socials || new SocialLink()
  
  /**
   * Create social links
   * @param {object} values
   */
  const createSocialLinks = (values) => {
    setLoading(true);
    _sl.create(values, student_id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        toaster.success(response.data.message, {duration: 5});
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setOpen(false);
        toaster.danger(returnError, {duration: 5});
      }
    );
  }
  
  /**
   * update social links
   * @param {object} values
   */
  const updateSocialLinks = (values) => {
    setLoading(true);
    _sl.update(values, socials.id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        toaster.notify(response.data.message, {duration: 5});
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setOpen(false);
        toaster.notify(returnError, {duration: 5});
      }
    );
  }
  
  /**
   * Switch between creation and update
   * @param {object} values
   */
  const onSubmit = (values) => {
    createMode ? createSocialLinks(values) : updateSocialLinks(values)
  }
  
  // renderer
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({
          values,
          handleChange,
          handleSubmit,
        }) => {
        return (
          <Modal
            closeIcon
            open={open}
            trigger={theTrigger}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header icon="user" content={(createMode ? "Create" : "Update") + " Social links"}/>
            <Modal.Content>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    name="github"
                    label="Github account"
                    placeholder="http://github.com/me"
                    value={values.github}
                    onChange={handleChange}
                  />
                  <Form.Input
                    name="linkedin"
                    label="Linkedin account"
                    placeholder="http://linkedin.com/in/me"
                    value={values.linkedin}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    name="stackoverflow"
                    label="stackoverflow account"
                    placeholder="http://stackoverflow.com/me"
                    value={values.stackoverflow}
                    onChange={handleChange}
                  />
                  <Form.Input
                    name="reddit"
                    label="Reddit account"
                    placeholder="http://reddit.com/in/me"
                    value={values.reddit}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    name="twitter"
                    label="Twitter account"
                    placeholder="http://twitter.com/me"
                    value={values.twitter}
                    onChange={handleChange}
                  />
                  <Form.Input
                    name="facebook"
                    label="Facebook account"
                    placeholder="http://facebook.com/me"
                    value={values.facebook}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Input
                  name="other"
                  label="Other account"
                  placeholder="http://example.com/me"
                  value={values.other}
                  onChange={handleChange}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove"/> Cancel
              </Button>
              <Button color="green" onClick={handleSubmit} loading={loading}>
                <Icon name="checkmark"/> {createMode ? "Create" : "Update"}
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default CreateEditSocialLinks;
