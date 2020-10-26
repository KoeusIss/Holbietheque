import React, { useState } from "react";
import SocialLink from "../../../models/links";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import StudentService from "../../../services/student_service";
import { toaster } from "evergreen-ui";
import { Formik } from "formik";
import Certificate from "../../../models/certificate";
import * as yup from "yup";

const AddSocialLinks = ({ theTrigger, student_id }) => {
  const [socialLink, setSocialLink] = useState(new SocialLink());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const socialLinkService = new StudentService("socials");

  return (
    <>
      <Formik
        initialValues={new SocialLink()}
        onSubmit={(values) => {
          console.log("from social: " + student_id);
          setLoading(true);
          socialLinkService.create(values, student_id).then(
            (response) => {
              setLoading(false);
              setOpen(false);
              toaster.notify(response.data.message, { duration: 5 });
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
              toaster.notify(returnError, { duration: 5 });
            }
          );
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
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
              <Header icon="user" content="Add profile" />
              <Modal.Content>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="github"
                      control={Input}
                      label="Github account"
                      placeholder="http://github.com/me"
                      onChange={handleChange}
                    />
                    <Form.Field
                      name="linkedin"
                      control={Input}
                      label="Linkedin account"
                      placeholder="http://linkedin.com/in/me"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="stackoverflow"
                      control={Input}
                      label="StackOverFlow account"
                      placeholder="http://stackoverflow.com/me"
                      onChange={handleChange}
                    />
                    <Form.Field
                      name="reddit"
                      control={Input}
                      label="Reddit account"
                      placeholder="http://reddit.com/in/me"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="twitter"
                      control={Input}
                      label="Twitter account"
                      placeholder="http://twitter.com/me"
                      onChange={handleChange}
                    />
                    <Form.Field
                      name="facebook"
                      control={Input}
                      label="Facebook account"
                      placeholder="http://facebook.com/me"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Field
                    name="Other"
                    control={Input}
                    label="Other account"
                    placeholder="http://example.com/me"
                    onChange={handleChange}
                  />
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> Cancel
                </Button>
                <Button color="green" onClick={handleSubmit} loading={loading}>
                  <Icon name="checkmark" /> Add
                </Button>
              </Modal.Actions>
            </Modal>
          );
        }}
      />
    </>
  );
};

export default AddSocialLinks;
