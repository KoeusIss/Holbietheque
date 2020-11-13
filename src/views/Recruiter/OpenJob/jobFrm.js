import React from "react";
import {Form, Input, Select, TextArea} from "semantic-ui-react";
import {Field} from "formik";
import {jobTypes} from "../../../components/Options";

const JobFrm = ({touched, errors}) => {
  return (
    <Form>
      <Form.Field>
        <label>Job title</label>
        <Field
          as={Input}
          name="title"
          placeholder='Job title'
          error={touched.title && errors.title}
        />
      </Form.Field>
      <Form.Group widths={"equal"}>
        <Form.Field>
          <label>Job type</label>
          <Field
            as={Select}
            search
            options={jobTypes}
            name="type"
            placeholder="Job type"
          />
        </Form.Field>
        <Form.Field>
          <label>Job salary</label>
          <Field
            as={Input}
            name="salary"
            placeholder='Job salary'
            error={touched.salary && errors.salary}
          />
        </Form.Field>
        <Form.Field>
          <label>Job location</label>
          <Field
            as={Input}
            name="location"
            placeholder='Job location'
            error={touched.location && errors.location}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Job summary</label>
        <Field
          as={TextArea}
          name="summary"
          placeholder='Short description about the job'
          error={touched.summary && errors.summary}
          style={{minHeight: "200px"}}
        />
      </Form.Field>
      <Form.Field>
        <label>Job Description</label>
        <Field
          as={TextArea}
          name="description"
          placeholder='Full description about the job'
          error={touched.description && errors.description}
          style={{minHeight: "600px"}}
        />
      </Form.Field>
    </Form>
  )
}

export default JobFrm