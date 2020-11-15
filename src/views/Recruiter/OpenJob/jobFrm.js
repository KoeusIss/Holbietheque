/**
 * Create job form
 */
import React, {useEffect} from "react";
import {Field} from "formik";
import {jobLevels, jobTypes} from "../../../components/Options";
import MDEditor from '@uiw/react-md-editor';
import {
  Form,
  Input,
  Select
} from "semantic-ui-react";

const JobFrm = ({touched, errors, job, createMode, value, setValue, data, handleChange, values, setFieldValue}) => {
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
    !createMode && setValue(job.description)
  }, [])
  return (
    <>
      <Form>
        <Form.Group widths={"equal"}>
          <Form.Field>
            <label>Job title</label>
            <Field
              as={Input}
              name="title"
              placeholder='Job title'
              error={touched.title && errors.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <Field
              as={Select}
              search
              options={[{key: 1, text: "Tunisia", value: "Tunisia"}]}
              name="location"
              placeholder="Location"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={"equal"}>
          <Form.Select
            name="type"
            placeholder="Job type"
            label={{
              children: "Job type",
              htmlFor: "form-select-control-job-type",
            }}
            search
            searchInput={{id: "form-select-control-job-type"}}
            options={jobTypes}
            onChange={handleChange}
          />
          <Form.Select
            name="level"
            placeholder="Required level"
            label={{
              children: "Required level",
              htmlFor: "form-select-control-job-level",
            }}
            search
            searchInput={{id: "form-select-control-job-level"}}
            options={jobLevels}
            onChange={(e, {value}) => {
              values.level = value
            }}
            value={values.level}
          />
          <Form.Field>
            <label>Job salary</label>
            <Field
              as={Input}
              name="salary"
              placeholder='Job salary'
              error={touched.salary && errors.salary}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <MDEditor
        value={value}
        onChange={setValue}
        height={500}
      />
    </>
  )
}

export default JobFrm