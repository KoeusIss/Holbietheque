/**
 * Add or edit job modal
 */
import React, {useEffect, useState} from "react";
import Recruiter from "../index";
import JobService from '../../../services/job_service'
import * as yup from "yup";
import {Formik, Field} from "formik";
import {toaster} from "evergreen-ui";
import {
  Button,
  Form,
  Header,
  Icon, Input,
  Modal,
} from "semantic-ui-react";
import JobFrm from "./jobFrm";

const AddEditJob = ({theTrigger, recruiter, job = null}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({})
  const createMode = !job
  
  /**
   * Recruiter initial value instance
   * @type Recruiter
   */
  useEffect(() => {
    Object.assign(data, {
      title: (job && job.title) || '',
      description: (job && job.description) || '',
      summary: (job && job.summary) || '',
      salary: (job && job.salary) || '',
      location: (job && job.location) || '',
      level: (job && job.level) || '',
      type: (job && job.type) || '',
      created_at: (job && job.created_at) || '',
    })
  }, [job])
  
  /**
   * create new job
   * @param {object} values
   */
  const createJob = (values) => {
    setLoading(true);
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
  
  /**
   * Validation schema shape
   */
  const validationSchema = yup.object().shape({
    title: yup.string().required("Job title is required")
  })
  
  return (
    <>
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={({
                   errors,
                   touched,
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
              <Header
                icon="briefcase"
                content={createMode ? `Add new job` : `Edit ${job.title} job`}
              />
              <Modal.Content scrolling>
                <JobFrm
                  touched={touched}
                  errors={errors}/>
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