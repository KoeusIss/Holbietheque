/**
 * Add or edit job modal
 */
import React, {useState} from "react";
import JobService from '../../../services/job_service'
import {Formik} from "formik";
import {toaster} from "evergreen-ui";
import {
  Button,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import JobFrm from "./jobFrm";

const AddEditJob = ({theTrigger, recruiter, job = null}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data] = useState({})
  const createMode = !job
  const [value, setValue] = React.useState("");
  
  /**
   * create new job
   * @param {object} values
   */
  const createJob = (values) => {
    setLoading(true);
    values.description = value;
    JobService.create(values, recruiter.id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        toaster.success(response.data.message, {duration: 5});
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
   * update an existent job
   * @param {object} values
   */
  const updateJob = (values) => {
    setLoading(true);
    values.description = value
    JobService.update(values, job.id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        toaster.success(response.data.message, {duration: 5});
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
   * onSubmit function
   * @param {object} values
   */
  const onSubmit = (values) => {
    if (createMode) {
      createJob(values)
    } else {
      updateJob(values)
    }
  }
  
  return (
    <>
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        render={({
                   values,
                   errors,
                   touched,
                   handleSubmit,
                   handleChange,
                   setFieldValue
                 }) => {
          return (
            <Modal
              closeIcon
              open={open}
              size="large"
              trigger={theTrigger}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header
                icon="briefcase"
                content={createMode ? `Add new job` : `Edit ${job.title} job`}
              />
              <Modal.Content scrolling>
                <JobFrm
                  touched={touched}
                  errors={errors}
                  job={job}
                  createMode={createMode}
                  value={value}
                  setValue={setValue}
                  data={data}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="red"
                  onClick={() => setOpen(false)}>
                  <Icon
                    name="remove"
                  />
                  Cancel
                </Button>
                <Button
                  color="green"
                  onClick={handleSubmit}
                  loading={loading}>
                  <Icon
                    name="checkmark"
                  />
                  {createMode ? "Create" : "Update"}
                </Button>
              </Modal.Actions>
            </Modal>
          );
        }}
      />
    </>
  )
}
export default AddEditJob