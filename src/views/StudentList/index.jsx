/**
 * StudentList list views
 */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Segment,
  Header,
  Container,
  Grid,
  Divider,
  Menu,
  Input,
  Card,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";
import { toaster } from "evergreen-ui";
import './studentList.css'
import UserService from "../../services/user_service";

/**
 * StudentList component
 * @returns {JSX.Element}
 * @constructor
 */
const StudentList = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    UserService.students().then(
      (res) => {
        setStudents(res.data.students);
        setCount(res.data.count);
        setLoading(false)
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
  }, [students]);

  return (
    <div className='list-container'>
      <Segment vertical style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Container>
          <Header as="h2">Students list</Header>
          <Divider hidden />
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Menu>
                  <Menu.Item>
                    <Input
                      icon="search"
                      placeholder="Search..."
                      transparent
                      iconPosition="left"
                    />
                  </Menu.Item>
                </Menu>
                <Divider hidden />
                {count === 0 ? (
                  <Segment placeholder>
                    <Header icon>
                      <Icon name="student" />
                      No students are listed.
                    </Header>
                  </Segment>
                ) : (
                    <Card.Group itemsPerRow={4} stackable>
                      {students.map((student) => {
                        return (
                          <Card key={student.id}>
                            <Card.Content>
                              <Image
                                floated="right"
                                verticalAlign="top"
                                src={student.image}
                              />
                              <Card.Header>{student.full_name}</Card.Header>
                              <Card.Meta>
                                {student.cohort &&
                                  "Cohort #" + student.cohort.name}
                              </Card.Meta>
                              <Card.Meta>
                                {student.specialization &&
                                  student.specialization.name}
                              </Card.Meta>
                              <Card.Description>
                                {student.about_me}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <div className="ui two buttons">
                                <Button
                                  basic
                                  color="blue"
                                  as={NavLink}
                                  to={"/students/" + student.id}
                                >
                                  View
                              </Button>
                              </div>
                            </Card.Content>
                          </Card>
                        );
                      })}
                    </Card.Group>
                  )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
};

export default StudentList;
