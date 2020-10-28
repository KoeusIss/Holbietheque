// Education pane

import React, { useEffect, useState } from "react";
import AddEducation from "./add_education";
import EditEducation from "./edit_education";
import StudentService from "../../../services/student_service";
import { Button, Header, Icon, Menu, Segment, Card } from "semantic-ui-react";
import { toaster } from "evergreen-ui";

const EducationPane = ({ profileId, owner }) => {
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState([]);
  const [count, setCount] = useState(0);
  const educationService = new StudentService("educations");

  useEffect(() => {
    setLoading(true);
    educationService.all(profileId).then(
      (res) => {
        setEducation(res.data.experiences);
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
  }, [education]);

  const handleDelete = (e) => {
    setLoading(true);
    educationService.delete(e.target.id).then(
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
            {/* Education create form modal trigger */}
            <AddEducation
              theTrigger={
                <Button icon basic>
                  <Icon name="plus" />
                </Button>
              }
              student_id={profileId}
            />
          </Menu.Item>
        )}
      </Menu>
      {/* Placeholder of there's no education */}
      {count === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="book" />
            No education are listed.
          </Header>
          {/* Education create form modal trigger */}
          {owner() && (
            <AddEducation
              theTrigger={
                <Button primary loading={loading}>
                  Add new education
                </Button>
              }
              student_id={profileId}
            />
          )}
        </Segment>
      ) : (
        <div>
          {education.map((edu) => {
            return (
              <Card fluid>
                <Card.Content>
                  <Card.Header>{edu.school}</Card.Header>
                  <Card.Meta>
                    {edu.degree}, {edu.major}
                  </Card.Meta>
                  <Card.Meta>
                    From {edu.start_at} to {edu.end_at}
                  </Card.Meta>
                  <Card.Description>{edu.description}</Card.Description>
                  {owner() && (
                    <Button.Group basic size="small" floated="right">
                      <Button icon="pencil" />
                      <Button icon="trash" />
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

export default EducationPane;
