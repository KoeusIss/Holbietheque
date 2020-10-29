import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Segment,
  Container,
  Image,
  Header,
  Divider,
  Button,
  Icon,
  Grid,
} from "semantic-ui-react";

const Home = () => {
  return (
    <>
      <Segment
        vertical
        textAlign="center"
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: "#000",
        }}
      >
        <Container>
          <Image
            src={require("../../images/welcome.svg")}
            style={{ display: "inline", width: "200px" }}
          />
          <Header as="h1" style={{ color: "#fff" }}>
            Hire The Profile You Desire
          </Header>
          <p style={{ color: "#fff" }}>Holberton School Student Platform</p>
          <Divider hidden />
          <Button
            basic
            icon
            labelPosition="left"
            as={NavLink}
            to="/students"
            color="teal"
          >
            <Icon name="student" />
            Students
          </Button>
          <Button
            basic
            icon
            labelPosition="right"
            color="teal"
            href="https://github.com/KoeusIss/holbie.tech"
          >
            <Icon name="github" />
            Project
          </Button>
        </Container>
      </Segment>
      <Segment vertical style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Container>
          <Grid stackable columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey" />
                  <Header.Content>Students collection</Header.Content>
                </Header>
                <p>A quick way to reach our students profiles informations</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address card" color="grey" />
                  <Header.Content>Simple & Easy</Header.Content>
                </Header>
                <p>
                  You want to signup ? nothing is complicated, reach out to the
                  signup page then fill your profile informations if you are a
                  student.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="star outline" color="grey" />
                  <Header.Content>Show them your skills</Header.Content>
                </Header>
                <p>
                  Show them what you are capable of by filling your CV
                  informations.
                </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey" />
                  <Header.Content>Contact us</Header.Content>
                </Header>
                <p>
                  You have a problem ? don't panic, you can fill the contact us
                  form and describe you problem.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      <Segment vertical style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h2>
                  What is Holbietheque
                  <Button
                    basic
                    icon
                    labelPosition="right"
                    floated="right"
                    as={NavLink}
                    to="/about"
                  >
                    <Icon name="right arrow" />
                    More
                  </Button>
                </h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Image
                  src={require("../../images/graduation.png")}
                  style={{ display: "inline", width: "200px" }}
                />
              </Grid.Column>
              <Grid.Column textAlign="center" verticalAlign="middle">
                <p>
                  As a developing team our main purpose for this project is to
                  allow recruiters to access the students list of our campus and
                  search for potention recruits providing the right information
                  about each student such as (Skills, Education, Experience...)
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      <Segment vertical style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h2>Our Mission</h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Image
                  src={require("../../images/Mission-Icon.png")}
                  style={{ display: "inline", width: "200px" }}
                />
              </Grid.Column>
              <Grid.Column textAlign="center" verticalAlign="middle">
                <p>
                  Our Mission is to provide the recruiters with the best
                  profiles they can hire and the students the chance to show
                  their skills in order to take one more step toward the
                  profesional life.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
};

export default Home;
