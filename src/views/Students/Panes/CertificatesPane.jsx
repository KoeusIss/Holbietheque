import {Button, Header, Icon, Menu, Segment, Placeholder, Card} from "semantic-ui-react";
import AddCertificateModal from "../Modal/AddCertificateModal";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserService from "../../../services/user_service";

const CertificatesPane = ({profileId}) => {
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let {id} = useParams();
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    UserService.getStudentCertificates(profileId).then(
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
        setError(returnError);
      }
    )
  }, [certificates])

  return (
    <div>
      <Menu text fluid>
        <Menu.Item position='right'>
          <AddCertificateModal
            theTrigger={
              <Button icon>
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
          <AddCertificateModal
            theTrigger={
              <Button primary>
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

export default CertificatesPane