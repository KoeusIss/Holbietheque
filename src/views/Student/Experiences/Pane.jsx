/**
 * Experience pane
 */
import React, {useEffect, useState} from "react";
import CreateEditExperience from "./CreateEdit";
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
 * Experience pane component
 * @param {string} profileId
 * @param owner
 * @returns {JSX.Element}
 * @constructor
 */
const ExperiencePane = ({profileId, owner}) => {
  const [loading, setLoading] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [count, setCount] = useState(0);
  const experienceService = new StudentService("experiences");
  
  // Load list of experience
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
        toaster.notify(returnError, {duration: 5});
      }
    );
  }, [experiences]);
  
  return (
    <div>
      <Menu text fluid>
        {owner() && (
          <Menu.Item position="right">
            {/* Experience create form modal trigger */}
            <CreateEditExperience
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
      {/* Placeholder if there's no experiences */}
      {count === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="briefcase"/>
            No experiences are listed.
          </Header>
          {/* Experience create form modal trigger */}
          {owner() && (
            <CreateEditExperience
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
              <Card fluid key={exp.id}>
                <Card.Content>
                  <Card.Header>{exp.title}</Card.Header>
                  <Card.Meta>
                    {exp.company}
                  </Card.Meta>
                  <Card.Meta>
                    From {exp.start_at} to {exp.end_at}
                  </Card.Meta>
                  <Card.Description>{exp.description}</Card.Description>
                  {owner() && (
                    <Button.Group basic size="small" floated="right">
                      {/* Experience edit form trigger */}
                      <CreateEditExperience
                        theTrigger={<Button icon="pencil"/>}
                        experience={exp}
                        student_id={profileId}
                      />
                      <DeleteModal
                        theTrigger={<Button icon="trash"/>}
                        experience={exp}
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

export default ExperiencePane;
