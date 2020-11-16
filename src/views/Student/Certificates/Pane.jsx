/**
 * Certiifcate pane
 */
import React, {useEffect, useState} from "react";
import CreateEditCertificate from "./CreateEdit";
import DeleteModal from "./Delete";
import StudentService from "../../../services/student_service";
import {
  Button,
  Header,
  Icon,
  Menu,
  Segment,
  Card
} from "semantic-ui-react";
import {toaster} from "evergreen-ui";

/**
 * Certificate pane component
 * @param {string} profileId
 * @param owner
 * @returns {JSX.Element}
 * @constructor
 */
const CertificatePane = ({profileId, owner}) => {
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [count, setCount] = useState(0);
  const certificateService = new StudentService("certificates");
  
  // load the list of certificate
  useEffect(() => {
    setLoading(true);
    certificateService.all(profileId).then(
      (res) => {
        setCertificates(res.data.certificates);
        setCount(res.data.count);
        setLoading(false);
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
    );
  }, [certificates]);
  
  return (
    <div>
      <Menu text fluid>
        {owner() && (
          <Menu.Item position="right">
            {/* Certificate create form modal trigger */}
            <CreateEditCertificate
              theTrigger={
                <Button icon basic loading={loading}>
                  <Icon name="plus"/>
                </Button>
              }
              student_id={profileId}
            />
          </Menu.Item>
        )}
      </Menu>
      {/* Placeholder if there's no certificates */}
      {count === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="certificate"/>
            No certificates are listed.
          </Header>
          {/* Certificate create form modal trigger */}
          {owner() && (
            <CreateEditCertificate
              theTrigger={
                <Button primary loading={loading}>
                  Add new Certificate
                </Button>
              }
              student_id={profileId}
            />
          )}
        </Segment>
      ) : (
        <div>
          {certificates.map((cert) => {
            return (
              <Card fluid key={cert.id}>
                <Card.Content>
                  <Card.Header>{cert.name}</Card.Header>
                  <Card.Meta>{cert.authority}</Card.Meta>
                  <Card.Description>{cert.description}</Card.Description>
                  {owner() && (
                    <Button.Group basic size="small" floated="right">
                      {/* Certificate edit form modal trigger */}
                      <CreateEditCertificate
                        theTrigger={<Button icon="pencil"/>}
                        certificate={cert}
                      />
                      {/* Certificate delete modal */}
                      <DeleteModal
                        theTrigger={<Button icon="trash"/>}
                        certificate={cert}
                      />
                    </Button.Group>
                  )}
                </Card.Content>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CertificatePane;
