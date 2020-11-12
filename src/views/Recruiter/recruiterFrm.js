import React from "react";
import {Form, Select, Input} from "semantic-ui-react";
import {Field} from "formik";
import {company_size, states, years} from "../../components/Options";

const RecruiterFrm = ({errors, touched, countries}) => {
  return (
    <Form>
      <Form.Field>
        <label>Company name</label>
        <Field
          as={Input}
          name="name"
          placeholder='First Name'
          error={touched.name && errors.name}
        />
      </Form.Field>
      <Form.Field>
        <label>Short description</label>
        <Field
          name="description"
          placeholder="Short description or a slogan"
        />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Web site</label>
          <Field
            name="web_site"
            placeholder="http://yourcompany.com"
          />
        </Form.Field>
        <Form.Field>
          <label>Company size</label>
          <Field
            as={Select}
            search
            options={company_size}
            name="company_size"
            placeholder="Company size"
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Headquarter</label>
          <Field
            as={Select}
            search
            options={countries}
            name="headquarter"
            placeholder="Headquarter location"
          />
        </Form.Field>
        <Form.Field>
          <label>Founded</label>
          <Field
            as={Select}
            search
            options={years}
            name="founded"
            placeholder="Founded years"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Logo</label>
        <Field
          type={"file"}
          name="logo"
          placeholder="Choose your logo"
        />
      </Form.Field>
    </Form>
  )
}

export default RecruiterFrm