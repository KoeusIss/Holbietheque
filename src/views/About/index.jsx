/**
 * About views
 */
import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react"
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Card,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const HomepageHeading = ({ mobile }) => (
  <Segment style={{ padding: "8em 0em" }} vertical>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em", color: "white" }}>
            Who is Holberton?
          </Header>
          <p style={{ fontSize: "1.33em", color: "white" }}>
            Frances Elizabeth Snyder Holberton (1917-2001), nicknamed Betty, was
            one of six programmers at ENIAC, the first fully electronic computer
            created by the US military in 1943. Betty Holberton played a major
            role in what has become today's computing. She also participated in
            the creation and design of the FORTRAN and COBOL programming
            languages. His daughters, Priscilla Holberton and Pamela Holberton,
            are thrilled that their mother's work is recognized and that it
            inspires a new generation of men and women in the IT field.
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            src={require("../../images/holberton.jpeg")}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row></Grid.Row>
    </Grid>
  </Segment>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};


class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            p
            inverted
            textAlign="center"
            style={{
              backgroundColor: "#2f2e41",
              minHeight: 700,
              padding: "1em 0em",
            }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};
const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }}>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='id card outline' />
          <Header.Content>Project creators and builders</Header.Content>
        </Header>
        <Divider hidden style={{ marginBottom: "5em" }} />
        <Grid stackable verticalAlign="middle">
          <Card.Group itemsPerRow={3}>
            <Card
              image='https://media-exp1.licdn.com/dms/image/C4E03AQGE3NyP9rHR6g/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=yY-bJpcAyJCihoh-4obkW0B1oW7DbAH2InXgYK67JiU'
              header='Iheb Chatti'
              meta="Full stack web developer"
              description='Iheb is the responsible for backend and DevOps technologies including deployment, and server maitenance'
              extra={<a href="http://github.com/IhebChatti"><Icon name='github' />IhebChatti</a>}
            />
            <Card
              image='https://media-exp1.licdn.com/dms/image/C5603AQFbU1EE3H1g4Q/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=9WKRP32BzpUdOCAz3Ml0aGSQzrJjk3VPTB4GZxFCAP4'
              header='Foued Dadi'
              meta="Full stack web developer"
              description='Foued Dadi is the designer of the project and front end builder with using Recat Js, CSS and HTML'
              extra={<a href="http://github.com/FouedDadi"><Icon name='github' />FouedDadi</a>}
            />
            <Card
              image='https://media-exp1.licdn.com/dms/image/C4E03AQFecUE73q39Xg/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=-SeUrBu1PU8Eu1kHPrY0-a6u-pwQbKzY8dUdZKGZFAM'
              header='Issam Sebri'
              meta="Full stack web developer"
              description='Sebri Issam is the responsible of the back end building and API'
              extra={<a href="http://github.com/KoeusIss"><Icon name='github' />KoeusIss</a>}
            />
          </Card.Group>
        </Grid>

      </Container>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em", color: "#000" }}>
              Our mission
            </Header>
            <p style={{ fontSize: "1.33em", color: "#000" }}>
              The tech industry is the fastest growing in history. At Holberton
              School, our mission is to empower motivated and talented people to
              lead the careers they dream of, regardless of their background,
              age, background or financial capacity. We also believe that
              diversity and inclusion are essential for innovation. More
              perspectives, life experiences and cultures promote problem
              solving and idea generation by being more community oriented. We
              believe that IT can only create solutions for everyone if all
              points of view are heard and respected. In our view, tuition fees
              should not be a barrier for those who wish to benefit from a
              quality education. We are ready to invest in your studies,
              allowing you to pay tuition fees through a revenue sharing
              agreement: you pay no upfront tuition fees and pay back the school
              once you get a job.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={require("../../images/holbertonimg.png")}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
