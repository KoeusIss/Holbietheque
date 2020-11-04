import React from "react";
import { Segment, Container, Grid, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Segment
      vertical
      style={{
        paddingTop: "4rem",
        paddingBottom: "4rem",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header as="h2">Holbie.tech</Header>© 2020-2021
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4">Authors</Header>
              <List>
                <List.Item>
                  <List.Icon name="github" />
                  <List.Content>
                    <a href="http://github.com/FouedDadi">Dadi Foued</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="github" />
                  <List.Content>
                    <a href="http://github.com/IhebChatti">Chatti Iheb</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="github" />
                  <List.Content>
                    <a href="http://github.com/KoeusIss">Sebri Issam</a>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4">Help</Header>
              <List>
                <List.Item>
                  <List.Icon name="map" />
                  <List.Content>
                    <a href="https://goo.gl/maps/wAvMvYmMEnku2VBw8">Map</a>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" />
                  <List.Content as={Link} to="/contact">
                    <a href="#">Contact us</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="info circle" />
                  <List.Content as={Link} to="/about">
                    <a>about us</a>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
export default Footer;
