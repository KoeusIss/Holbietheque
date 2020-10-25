
import AddCertificate from "./add_certificate";
import React, {useEffect, useState} from "react";
import EditCertificate from "./edit_certificate";
import {
  Button,
  Header,
  Icon,
  Menu,
  Segment,
  Card
} from "semantic-ui-react";
import {toaster} from "evergreen-ui";
import StudentService from "../../../services/student_service";

const Certificate_pane = ({profileId}) => {
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([])
  const certificateService = new StudentService("certificates")

  useEffect(() => {
    certificateService.all(profileId).then(
      (res) => {
        setCertificates(res.data.certificates)
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toaster.notify(returnError, {duration: 5});
      }
    )
  }, [certificates])


  const handleDelete = (e) => {
    console.log(e.target.id)
    setLoading(true)
    certificateService.delete(e.target.id).then(
      (response) => {
        setLoading(false)
        toaster.notify(response.data.message, {duration: 5})
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toaster.notify(returnError, {duration: 5})
      }
    )
  }

  return (
    <div>
      <Menu text fluid>
        <Menu.Item position='right'>
          <AddCertificate
            theTrigger={
              <Button icon basic loading={loading}>
                <Icon name='plus'/>
              </Button>
            }
            student_id={profileId}
          />
        </Menu.Item>
      </Menu>
      {!certificates ?
        <Segment placeholder>
          <Header icon>
            <Icon name='book'/>
            No certificates are listed.
          </Header>
          <AddCertificate
            theTrigger={
              <Button primary loading={loading}>
                Add education
              </Button>
            }
            student_id={profileId}
          />
        </Segment>
        :
        <div>
          {
            certificates.map((cert) => {
              return (
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{cert.name}</Card.Header>
                    <Card.Meta>{cert.authority}</Card.Meta>
                    <Card.Description>
                      {cert.description}
                    </Card.Description>
                    <Button.Group basic size='small' floated='right'>
                      <EditCertificate
                        theTrigger={<Button icon='pencil'/>}
                        data={cert}
                      />
                      <Button icon='trash' onClick={handleDelete} id={cert.id}/>
                    </Button.Group>
                  </Card.Content>

                </Card>
              )

            })
          }
        </div>
      }
    </div>
  )
}

export default Certificate_pane