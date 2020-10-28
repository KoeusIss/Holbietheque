import React from "react";
import { NavLink } from "react-router-dom";
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
            Holberton school student platform
          </Header>
          <p style={{ color: "#fff" }}>
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed in
          </p>
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
          <Button basic icon labelPosition="right" color="teal">
            <Icon name="github" />
            Project
          </Button>
        </Container>
      </Segment>
      <Segment vertical style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <Container>
          <Grid stackable columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey" />
                  <Header.Content>Contact collection</Header.Content>
                </Header>
                <p>
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced
                </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="tags" color="grey" />
                  <Header.Content>Contact collection</Header.Content>
                </Header>
                <p>
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced
                </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="chess king" color="grey" />
                  <Header.Content>Contact collection</Header.Content>
                </Header>
                <p>
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="handshake outline" color="grey" />
                  <Header.Content>Contact collection</Header.Content>
                </Header>
                <p>
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced
                </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey" />
                  <Header.Content>Contact collection</Header.Content>
                </Header>
                <p>
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced
                </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  <Icon name="address book outline" color="grey" />
                  <Header.Content>Contact collection</Header.Content>
                </Header>
                <p>
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced
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
                  Best profile
                  <Button basic icon labelPosition="right" floated="right">
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
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring whi
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
                  Best profile
                  <Button basic icon labelPosition="right" floated="right">
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
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring whi
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
