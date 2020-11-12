/**
 * Home views
 */
import React from "react";
import {NavLink} from "react-router-dom";
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
import "./home.css"

/**
 * Home component provide a presentation of the web application
 * a static page
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
  return (
    <>
      {/* Heading segment */}
      <Segment
        vertical
        textAlign="center"
        className={"home-section"}
      >
        <Container>
          <Image
            src={require("../../images/welcome.svg")}
            style={{display: "inline", width: "500px"}}
          />
          <Header as="h1" style={{color: "#fff"}}>
            Find your best suit candidate
          </Header>
          <p style={{color: "#fff"}}>Holberton school student platform</p>
          <Divider hidden/>
          <Button
            icon
            labelPosition="left"
            as={NavLink}
            to="/students"
            style={{backgroundColor: "#69f0ae"}}
          >
            <Icon name="student"/>
            Students
          </Button>
          <Button
            icon
            labelPosition="right"
            style={{backgroundColor: "#69f0ae"}}
            href="https://github.com/KoeusIss/holbie.tech"
          >
            <Icon name="github"/>
            Project
          </Button>
        </Container>
      </Segment>
      {/* Widget segment */}
      <Segment vertical className={"home-section"}>
        <Container>
          <Grid stackable columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey"/>
                  <Header.Content>Students collection</Header.Content>
                </Header>
                <p>A quick way to reach our students profiles informations</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address card" color="grey"/>
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
                  <Icon name="star outline" color="grey"/>
                  <Header.Content>Show them your skills</Header.Content>
                </Header>
                <p>
                  Show them what you are capable of by filling your CV
                  informations.
                </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey"/>
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
      {/* What is holbietech segment */}
      <Segment vertical className={"home-section"}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h2>
                  What is Holbietheque
                </h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Image
                  src={require("../../images/hire.svg")}
                  style={{display: "inline", width: "300px"}}
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
      {/* Our mission segment */}
      <Segment vertical className={"home-section"}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h2>Our Mission</h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Image
                  src={require("../../images/mission.svg")}
                  style={{display: "inline", width: "200px"}}
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
