/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import UserService from "../../services/user_service";
import React, { Component } from "react";
import { toaster } from "evergreen-ui";
import {
  Button,
  Container,
  Icon,
  Menu,
  Segment,
  Image,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  current_user = UserService.currentUser();

  handleLogout = () => {
    localStorage.removeItem("access_token");
    toaster.success("Logout Successful, See you soon!", { duration: 3 });
  };
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
          <Menu
            style={{
              backgroundColor: "#000",
            }}
            fixed={fixed ? "top" : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container class="container">
              <Menu.Item style={{ color: "white" }} as={NavLink} to="/" active>
                Home
              </Menu.Item>
              <Menu.Item style={{ color: "white" }} as={NavLink} to="/students">
                Students
              </Menu.Item>
              <Menu.Item style={{ color: "white" }} as={NavLink} to="/about">
                About
              </Menu.Item>
              <Menu.Item style={{ color: "white" }} as={NavLink} to="/contact">
                Contact
              </Menu.Item>
              <Menu.Item style={{ color: "white" }} position="right">
                {this.current_user ? (
                  <Button
                    as={NavLink}
                    to="/login"
                    onClick={this.handleLogout}
                    style={{ color: "#eb0045" }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button as={NavLink} to="/login">
                    Login
                  </Button>
                )}
                {!this.current_user ? (
                  <Button
                    as={NavLink}
                    to="/signup"
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                ) : null}
              </Menu.Item>
            </Container>
          </Menu>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};
export default DesktopContainer;
