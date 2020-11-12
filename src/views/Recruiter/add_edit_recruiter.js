/**
 * Edit view
 */
import React, {useEffect, useState} from "react";
import {toaster} from "evergreen-ui";
import * as yup from "yup";
import {Formik} from "formik";
import Recruiter from "../Recruiter";
import RecruiterFrm from "./recruiterFrm";
import RecruiterService from "../../services/recruiter_service";
import {
  Button,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import LocationService from "../../services/loacation_service";

/**
 * Edit recruiter modal
 * @param {JSX.Element} theTrigger
 * @param {object} recruiter
 * @returns {JSX.Element}
 * @constructor
 */
const EditRecruiter = ({theTrigger, recruiter}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({})
  
  const [countries, setCountries] = React.useState([])
  useEffect(() => {
    LocationService.getCountries().then(
      (response) => {
        response.data.countries.map((c) => {
          countries.push(
            {key: c.id, text: c.name, value: c.name}
          )
        })
      }
    )
  }, [])
  /**
   * Recruiter initial value instance
   * @type Recruiter
   */
  useEffect(() => {
    Object.assign(data, {
      "name": recruiter.name,
      "description": recruiter.description,
      "web_site": recruiter.web_site,
      "founded": recruiter.founded,
      "logo": recruiter.logo,
      "headquarter": recruiter.headquarter,
      "company_size": recruiter.company_size
    })
  }, [recruiter])
  
  
  /**
   * Submit a create request in order to receive a success message
   * @param {object} values collected values from Formik form
   */
  const onSubmit = (values) => {
    setLoading(true);
    RecruiterService.update(values, recruiter.id).then(
      (response) => {
        setLoading(false);
        setOpen(false);
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
        initialValues={data}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={({
                   values,
                   errors,
                   touched,
                   handleBlur,
                   handleSubmit,
                   handleChange,
                 }) => {
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
                <RecruiterFrm
                  touched={touched}
                  errors={errors}
                  countries={countries}
                />
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
}

export default EditRecruiter;
