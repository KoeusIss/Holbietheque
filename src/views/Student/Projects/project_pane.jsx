// Project pane

import React, { useEffect, useState } from "react";
import AddProject from "./add_project";
import EditProject from "./edit_project";
import StudentService from "../../../services/student_service";
import { Button, Header, Icon, Menu, Segment, Card } from "semantic-ui-react";
import { toaster } from "evergreen-ui";

const ProjectPane = ({ profileId, owner }) => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [count, setCount] = useState(0);
  const projectService = new StudentService("projects");

  useEffect(() => {
    setLoading(true);
    projectService.all(profileId).then(
      (res) => {
        setProjects(res.data.projects);
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
  }, [projects]);

  const handleDelete = (e) => {
    console.log(e.target.id);
    setLoading(true);
    projectService.delete(e.target.id).then(
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
            <AddProject
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
      {count === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="briefcase" />
            No experience are listed.
          </Header>
          {owner() && (
            <AddProject
              theTrigger={<Button primary>Add new project</Button>}
              student_id={profileId}
            />
          )}
        </Segment>
      ) : (
        <div>
          {projects.map((project) => {
            return (
              <Card fluid key={project.id}>
                <Card.Content>
                  <Card.Header>{project.name}</Card.Header>
                  <Card.Meta>
                    From {project.start_at} to {project.end_at}
                  </Card.Meta>
                  <Card.Description>{project.description}</Card.Description>
                  {owner() && (
                    <Button.Group basic size="small" floated="right">
                      <EditProject
                        theTrigger={<Button icon="pencil" />}
                        data={project}
                      />
                      <Button
                        icon="trash"
                        onClick={handleDelete}
                        id={project.id}
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

export default ProjectPane;
