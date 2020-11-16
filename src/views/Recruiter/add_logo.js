/**
 * upload logo
 */
import React, {useEffect, useState} from 'react'
import {Formik} from "formik";
import RecruiterService from "../../services/recruiter_service";
import {toaster} from "evergreen-ui";
import {
  Button,
  Image,
  Modal,
  Input,
  Segment,
  Header,
  Icon
} from 'semantic-ui-react'
import image from "../../images/image.png"

/**
 * upload logo component
 * @param {object} recruiter
 * @returns {JSX.Element}
 * @constructor
 */
const UploadLogo = ({recruiter}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [theImage, setImage] = useState(null)
  const [logo, setLogo] = useState("../../images/image.png")
  
  useEffect(() => {
    setLogo(recruiter.logo)
  }, [recruiter])
  
  /**
   * Onsubmit form function
   * @param values
   */
  const onSubmit = (values) => {
    setLoading(true)
    let frmData = new FormData();
    frmData.append("logo", values.logo);
    RecruiterService.upload(frmData, recruiter.id).then(
      (response) => {
        setOpen(false);
        setLoading(false)
        toaster.success(response.data.message, {duration: 5});
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setOpen(false);
        setLoading(false)
        toaster.danger(message, {duration: 5});
      }
    )
  }
  
  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      render={({
                 handleSubmit,
                 setFieldValue
               }) => {
        return (
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<img src={image}/>}
          >
            <Modal.Header>Upload image</Modal.Header>
            <Modal.Content>
              <form>
                <Segment placeholder>
                  <Segment
                    style={{border: "dotted 1px grey", minHeight: "200px", width: "200px", margin: "auto"}}
                  >
                    <Image src={theImage}/>
                  </Segment>
                  <Header icon as="h5">
                    <Icon name='upload'/>
                    Please select your logo image
                  </Header>
                  <Input
                    type="file"
                    name="logo"
                    onChange={(event) => {
                      setImage(URL.createObjectURL(event.target.files[0]))
                      setFieldValue("logo", event.currentTarget.files[0]);
                    }}
                  />
                </Segment>
              </form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} positive loading={loading}>
                Ok
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }}
    />
  )
}

export default UploadLogo
