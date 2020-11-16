//Index
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfilePane from "./Profile/profile_pane";
import EducationPane from "./Education/Pane";
import ExperiencePane from "./Experiences/Pane";
import ProjectPane from "./Projects/Pane";
import CertificatePane from "./Certificates/Pane";
import UserService from "../../services/user_service";
import AStudent from "../../models/student";
// GUI
import {
  Grid,
  Image,
  Segment,
  Button,
  Card,
  Icon,
  Container,
  List,
  Tab,
} from "semantic-ui-react";
import "./student.css";
import AddEditProfile from "./Profile/add_profile";

const Student = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [language, setLanguage] = useState([{}]);
  const [skill, seSkill] = useState([{}]);
  const [student, setStudent] = useState(new AStudent());
  const current_user = UserService.currentUser();
  let { id } = useParams();

  const owner = () => {
    if (student && current_user && student.user.id === current_user.id) {
      return true;
    } else {
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    UserService.student(id).then(
      (res) => {
        setStudent(res.data.student);
        setLocation(res.data.address);
        setSocialLinks(res.data.social);
        setLanguage(res.data.language);
        seSkill(res.data.skills);
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
      }
    );
  }, [student]);

  return (
    <Container>
      <Segment vertical style={{ paddingTop: "4rem", paddingBottom: "10rem" }}>
        {student.id ? (
          <Grid stackable>
            <Grid.Column width={5}>
              <Card fluid>
                <Image src={student.image} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{student.full_name}</Card.Header>
                  {student.specialization && (
                    <Card.Meta>
                      <span>{student.specialization}</span>
                    </Card.Meta>
                  )}
                  <Card.Description>
                    <Card.Content>
                      <List>
                        {location && location.state && (
                          <List.Item>
                            <List.Icon name="marker" />
                            <List.Content>
                              {location.state.name},{" "}
                              {location.state.country.name}
                            </List.Content>
                          </List.Item>
                        )}
                        {socialLinks && (
                          <>
                            {socialLinks.github && (
                              <List.Item>
                                <List.Icon name="github" />
                                <List.Content>
                                  {socialLinks.github}
                                </List.Content>
                              </List.Item>
                            )}
                            {socialLinks.linkedin && (
                              <List.Item>
                                <List.Icon name="linkedin" />
                                <List.Content>
                                  {socialLinks.linkedin}
                                </List.Content>
                              </List.Item>
                            )}
                            {socialLinks.medium && (
                              <List.Item>
                                <List.Icon name="medium m" />
                                <List.Content>
                                  {socialLinks.medium}
                                </List.Content>
                              </List.Item>
                            )}
                            {socialLinks.twitter && (
                              <List.Item>
                                <List.Icon name="medium m" />
                                <List.Content>
                                  {socialLinks.twitter}
                                </List.Content>
                              </List.Item>
                            )}
                            {socialLinks.stackoverflow && (
                              <List.Item>
                                <List.Icon name="stack overflow" />
                                <List.Content>
                                  {socialLinks.stackoverflow}
                                </List.Content>
                              </List.Item>
                            )}
                            {student.user.email && (
                              <List.Item>
                                <List.Icon name="mail" />
                                <List.Content>
                                  <a href={"mailto:" + student.user.email}>
                                    {student.user.email}
                                  </a>
                                </List.Content>
                              </List.Item>
                            )}
                            {student.website && (
                              <List.Item>
                                <List.Icon name="linkify" />
                                <List.Content>
                                  <a href={student.website}>
                                    {student.website}
                                  </a>
                                </List.Content>
                              </List.Item>
                            )}
                          </>
                        )}
                      </List>
                    </Card.Content>
                  </Card.Description>
                </Card.Content>
                {student.cohort && (
                  <Card.Content extra>
                    <Icon name="user" />
                    {student.cohort}
                  </Card.Content>
                )}

                {owner() && (
                  <Card.Content extra>
                    <AddEditProfile
                      theTrigger={<Button basic>Edit profile</Button>}
                      student={student}
                      userID={student.user.id}
                    />
                  </Card.Content>
                )}
              </Card>
            </Grid.Column>
            <Grid.Column width={11}>
              <Tab
                menu={{ attached: false }}
                panes={[
                  {
                    menuItem: "Overview",
                    render: () => (
                      <ProfilePane
                        student={student}
                        socialLinks={socialLinks}
                        languages={language}
                        skills={skill}
                        owner={owner}
                      />
                    ),
                  },
                  {
                    menuItem: "Education",
                    render: () => (
                      <EducationPane profileId={student.id} owner={owner} />
                    ),
                  },
                  {
                    menuItem: "Experience",
                    render: () => (
                      <ExperiencePane profileId={student.id} owner={owner} />
                    ),
                  },
                  {
                    menuItem: "Certificates",
                    render: () => (
                      <CertificatePane profileId={student.id} owner={owner} />
                    ),
                  },
                  {
                    menuItem: "Projects",
                    render: () => (
                      <ProjectPane profileId={student.id} owner={owner} />
                    ),
                  },
                ]}
              />
            </Grid.Column>
          </Grid>
        ) : null}
      </Segment>
    </Container>
  );
};
export default Student;
