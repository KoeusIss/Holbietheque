// Experience pane

import React, { useEffect, useState } from "react";
import AddExperience from "./add_experience";
import EditExperience from "./edit_experience";
import StudentService from "../../../services/student_service";
import { Button, Header, Icon, Menu, Segment, Card } from "semantic-ui-react";
import { toaster } from "evergreen-ui";

const ExperiencePane = ({ profileId, owner }) => {
  const [loading, setLoading] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [count, setCount] = useState(0);
  const experienceService = new StudentService("experiences");

  useEffect(() => {
    setLoading(true);
    experienceService.all(profileId).then(
      (res) => {
        setExperiences(res.data.experiences);
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
  }, [experiences]);

  const handleDelete = (e) => {
    console.log(e.target.id);
    setLoading(true);
    experienceService.delete(e.target.id).then(
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
            {/* Experience create form modal trigger */}
            <AddExperience
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
      {/* Placeholder if there's no expereinces */}
      {count === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="briefcase" />
            No experiences are listed.
          </Header>
          {/* Experience create form modal trigger */}
          {owner() && (
            <AddExperience
              theTrigger={
                <Button primary loading={loading}>
                  Add new experience
                </Button>
              }
              student_id={profileId}
            />
          )}
        </Segment>
      ) : (
        <div>
          {experiences.map((exp) => {
            return (
              <Card fluid key={exp.title}>
                <Card.Content>
                  <Card.Header>{exp.company}</Card.Header>
                  <Card.Meta>
                    From {exp.start_at} to {exp.end_at}
                  </Card.Meta>
                  <Card.Description>{exp.description}</Card.Description>
                  {owner() && (
                    <Button.Group basic size="small" floated="right">
                      {/* Experience edit form trigger */}
                      <EditExperience
                        theTrigger={<Button icon="pencil" />}
                        data={exp}
                      />
                      <Button icon="trash" onClick={handleDelete} id={exp.id} />
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

export default ExperiencePane;
