import React, {useState} from "react";
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
import {toaster} from "evergreen-ui";
import * as yup from "yup";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import Recruiter from "../Recruiter";
import {
  years,
  company_size,
  states
} from "../../components/Options";
import RecruiterService from "../../services/recruiter_service";

const AddNewRecruiter = ({theTrigger, user_id}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [charCount, setCharCount] = useState(255)
  const history = useHistory();
  
  /**
   * Recruiter initial value instance
   * @type Recruiter
   */
  const [initialValue, setInitialValue] = useState({
    "name": "",
    "description": "",
    "web_site": "",
    "founded": "",
    "company_size": "",
    "headquarter": "",
    "logo": ""
  })
  /**
   * Submit a create request in order to receive a success message
   * @param {object} values collected values from Formik form
   */
  const onSubmit = (values) => {
    setLoading(true);
    RecruiterService.create(values, user_id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
        /* Refresh the access_toke in local storage */
        localStorage.setItem("access_token", response.data.access_token);
        history.push("/recruiters/" + response.data.recruiter.id);
        window.location.reload();
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
    name: yup.string().required("Company name is required")
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
            if (e.target.name === "description") {
            }
          }
          return (
            <Modal
              closeIcon
              open={open}
              trigger={theTrigger}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header icon="user" content="Create new recruiter profile"/>
              <Modal.Content>
                <Form>
                  <Form.Input
                    name="name"
                    required
                    label="Company name"
                    placeholder="Company name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                  />
                  <Form.Input
                    name="description"
                    label="Short description"
                    placeholder="Short description or a slogan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && errors.description}
                  />
                  <Form.Group widths="equal">
                    <Form.Input
                    name="web_site"
                    label="Web site"
                    placeholder="http://yourcompany.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.web_site && errors.web_site}
                  />
                    <Form.Select
                      options={company_size}
                      label={{
                        children: "Company size",
                        htmlFor: "form-select-control-size",
                      }}
                      placeholder="Company size"
                      search
                      searchInput={{id: "form-select-control-size"}}
                      name="company_size"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Select
                      options={states}
                      label={{
                        children: "Headquarter location",
                        htmlFor: "form-select-control-location",
                      }}
                      placeholder="Headquarter location"
                      search
                      searchInput={{id: "form-select-control-location"}}
                      name="headquarter"
                      onChange={handleChange}
                    />
                    <Form.Select
                      options={years}
                      label={{
                        children: "Founded year",
                        htmlFor: "form-select-control-year",
                      }}
                      placeholder="Founded year"
                      search
                      searchInput={{id: "form-select-control-year"}}
                      name="founded"
                      onChange={handleChange}
                    />
                  </Form.Group>
                   <Form.Input
                    name="logo"
                    label="Logo"
                    placeholder="Choose your logo"
                    type={"file"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.web_site && errors.web_site}
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

export default AddNewRecruiter;
