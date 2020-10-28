import React from "react";
import { Segment, Container, Grid, Header, List } from "semantic-ui-react";

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
                    <a href="http://github.com/KoeusIss">Dadi Foued</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="github" />
                  <List.Content>
                    <a href="http://github.com/KoeusIss">Chatti Iheb</a>
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
              <Header as="h4">About</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
export default Footer;
