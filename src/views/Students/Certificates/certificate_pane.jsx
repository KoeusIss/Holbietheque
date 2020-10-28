// Certificate pane

import React, { useEffect, useState } from "react";
import AddCertificate from "./add_certificate";
import EditCertificate from "./edit_certificate";
import StudentService from "../../../services/student_service";
import { Button, Header, Icon, Menu, Segment, Card } from "semantic-ui-react";
import { toaster } from "evergreen-ui";

const CertificatePane = ({ profileId, owner }) => {
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [count, setCount] = useState(0);
  const certificateService = new StudentService("certificates");

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
        toaster.notify(returnError, { duration: 5 });
      }
    );
  }, [certificates]);

  const handleDelete = (e) => {
    console.log(e.target.id);
    setLoading(true);
    certificateService.delete(e.target.id).then(
      (response) => {
        setLoading(false);
        toaster.notify(response.data.message, { duration: 5 });
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toaster.notify(returnError, { duration: 5 });
      }
    );
  };

  return (
    <div>
      <Menu text fluid>
        {owner() && (
          <Menu.Item position="right">
            {/* Certificate create form modal trigger */}
            <AddCertificate
              theTrigger={
                <Button icon basic loading={loading}>
                  <Icon name="plus" />
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
            <Icon name="certificate" />
            No certificates are listed.
          </Header>
          {/* Certificate create form modal trigger */}
          {owner() && (
            <AddCertificate
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
              <Card fluid>
                <Card.Content>
                  <Card.Header>{cert.name}</Card.Header>
                  <Card.Meta>{cert.authority}</Card.Meta>
                  <Card.Description>{cert.description}</Card.Description>
                  {owner() && (
                    <Button.Group basic size="small" floated="right">
                      {/* Certificate edit form modal trigger */}
                      <EditCertificate
                        theTrigger={<Button icon="pencil" />}
                        data={cert}
                      />
                      <Button
                        icon="trash"
                        onClick={handleDelete}
                        id={cert.id}
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
