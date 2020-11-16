/**
 * Create job form
 */
import React, {useEffect} from "react";
import {jobLevels, jobTypes} from "../../../components/Options";
import MDEditor from '@uiw/react-md-editor';
import {Form} from "semantic-ui-react";

const JobFrm = ({
                  touched,
                  errors,
                  handleBlur,
                  job,
                  createMode,
                  value,
                  setValue,
                  data,
                  handleChange,
                  values
                }) => {
  // Load available data for the job
  useEffect(() => {
    Object.assign(data, {
      title: (job && job.title) || '',
      description: (job && job.description) || '',
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
            <Form.Input
              name="title"
              required
              label="Job title"
              value={values.title}
              placeholder="Job title"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && errors.title}
            />
          </Form.Field>
          <Form.Input
            name="location"
            required
            label="Location"
            value={values.location}
            placeholder="Job location"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location && errors.location}
          />
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
            onChange={(e, {value}) => {
              values.type = value
            }}
            value={values.type}
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
          <Form.Input
            name="salary"
            required
            label="Annual salary"
            value={values.salary}
            placeholder="Proposed annual salary"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.salary && errors.salary}
          />
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