import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Popup,
  Form,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
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

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
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
              backgroundColor: "#000",
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
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={require("../../images/founders.jpeg")}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em", color: "#000" }}>
              Founders of Holberton School
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Sylvain Kalache and Julien Barbier created Holberton School in San
              Francisco to respond to a problem observed in the tech world: to
              become computer engineers, some students spent many years
              studying, sometimes going so far as to get into debt. , and still
              lacked the skills to find their dream job. Sylvain and Julien have
              thus decided to create a school which teaches students to think
              like the best developers, which helps them develop human skills to
              stand out during interviews and throughout their career, and which
              offers a curriculum focused on practical experience through a
              full-stack development program. Since its opening in 2016,
              Holberton School has been able to get noticed by the most
              innovative companies on the planet. Our graduates have been
              offered exciting jobs at LinkedIn, Google, Tesla, Docker, Apple,
              Dropbox, Facebook, Pinterest, Genentech, Cisco, IBM, etc. In
              addition, Holberton School has opened several campuses around the
              world, and our unique, proven and scalable approach has caught the
              attention of major investors in Silicon Valley.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
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

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
