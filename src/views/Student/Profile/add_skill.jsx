import React, { useState } from "react";
import Skill from "../../../models/skill";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
} from "semantic-ui-react";
import StudentService from "../../../services/student_service";
import { toaster } from "evergreen-ui";
import { Formik } from "formik";

const AddSkill = ({ theTrigger, student_id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const skillService = new StudentService("skills");

  return (
    <>
      <Formik
        initialValues={new Skill()}
        onSubmit={(values) => {
          console.log("from skills: " + student_id);
          setLoading(true);
          skillService.create(values, student_id).then(
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
              <Header icon="user" content="Add profile" />
              <Modal.Content>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field
                      name="skill"
                      control={Input}
                      label="Skill"
                      placeholder="Python"
                      onChange={handleChange}
                    />
                    <Form.Field
                      name="level"
                      control={Input}
                      label="Level"
                      placeholder="Novice"
                      onChange={handleChange}
                    />
                  </Form.Group>
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

export default AddSkill;
