/**
 * Navbar
 */
import React, {useState} from "react";
import UserService from "../../services/user_service"
import "./navbar.css";
import {
  Button,
  Container,
  Grid,
  Icon,
  Menu,
} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {toaster} from "evergreen-ui";

/**
 * Navbar component
 */
const Navbar = () => {
  const [dropdownMenuStyle, setDropdownMenuStyle] = useState({display: "none"})
  const currentUser = UserService.currentUser()
  
  /**
   * userPath handle the switch between the two role user and student in order
   * to redirect the user to the right profile page
   * @returns {string}
   */
  const userPath = () => {
    if (!currentUser.profile) {
      return "/new"
    } else {
      if (currentUser.role === "student") {
        return `/students/${currentUser.profile}`
      } else if (currentUser.role === "recruiter") {
        return `/recruiters/${currentUser.profile}`
      }
    }
  }
  
  /**
   * handleLogout wraps the logout of the user
   */
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toaster.success("Logout Successful, See you soon!", {duration: 3});
  };
  
  /**
   * handleToggleDropDownMenu is responsible for toggling the menu bar as dropdown
   */
  const handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, dropdownMenuStyle);
    if (newState.display === "none") {
      newState = {display: "flex"};
    } else {
      newState = {display: "none"};
    }
    setDropdownMenuStyle(newState)
  };
  
  return (
    <div className="App">
      <Grid padded className="tablet computer only">
        <Menu borderless fluid size="huge">
          <Container>
            <Menu.Item header as={NavLink} to={"/"} style={{color: "#fff"}}>
              Holbietech
            </Menu.Item>
            <Menu.Item active as={NavLink} to={"/"} style={{color: "#fff"}}>
              Home
            </Menu.Item>
            <Menu.Item as={NavLink} to={"/about"} style={{color: "#fff"}}>About</Menu.Item>
            <Menu.Item as={NavLink} to={"/contact"} style={{color: "#fff"}}>Contact</Menu.Item>
            <Menu.Item as={NavLink} to={"/jobs"} style={{color: "#fff"}}>Jobs</Menu.Item>
            <Menu.Item as={NavLink} to={"/students"} style={{color: "#fff"}}>Students</Menu.Item>
            <Menu.Menu position="right">
              {currentUser ?
                <>
                  <Menu.Item as={NavLink} to={userPath} style={{color: "#fff"}}>Profile</Menu.Item>
                  <Menu.Item as={NavLink} to={"/login"} style={{color: "#fff"}}>
                    <Button basic color={'green'} onClick={handleLogout}>Logout</Button>
                  </Menu.Item>
                </>
                :
                <Menu.Item as={NavLink} to={"/login"} style={{color: "#fff"}}>
                  <Button basic color={'green'}>Login</Button>
                </Menu.Item>
              }
            </Menu.Menu>
          </Container>
        </Menu>
      </Grid>
      <Grid padded className="mobile only">
        <Menu borderless fluid size="huge">
          <Menu.Item header as="a">
            Holbietech
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                icon
                basic
                color={'green'}
                toggle
                onClick={handleToggleDropdownMenu}
              >
                <Icon name="content" style={{color: "#fff"}}/>
              </Button>
            </Menu.Item>
          </Menu.Menu>
          <Menu
            vertical
            borderless
            fluid
            style={dropdownMenuStyle}
          >
            <Menu.Item active as={NavLink} to={"/"} style={{color: "#fff"}} onClick={handleToggleDropdownMenu}>
              Home
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to={"/about"} style={{color: "#fff"}} onClick={handleToggleDropdownMenu}>About</Menu.Item>
            <Menu.Item
              as={NavLink}
              to={"/contact"}
              style={{color: "#fff"}}
              onClick={handleToggleDropdownMenu}
            >
              Contact
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to={"/jobs"}
              style={{color: "#fff"}}
              onClick={handleToggleDropdownMenu}
            >
              Jobs
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to={"/students"}
              style={{color: "#fff"}}
              onClick={handleToggleDropdownMenu}
            >
              Students
            </Menu.Item>
            {currentUser ?
              <>
                <Menu.Item
                  as={NavLink}
                  to={userPath}
                  style={{color: "#fff"}}
                  onClick={handleToggleDropdownMenu}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  as={NavLink}
                  to={"/login"}
                >
                  <Button
                    basic
                    fluid
                    color={'green'}
                    onClick={handleLogout}
                  >
                    logout
                  </Button>
                </Menu.Item>
              </>
              :
              <Menu.Item
                as={NavLink}
                to={"/login"}
              >
                <Button
                  basic
                  fluid
                  color={'green'}
                  onClick={handleToggleDropdownMenu}
                >
                  Login
                </Button>
              </Menu.Item>
            }
          </Menu>
        </Menu>
      </Grid>
    </div>
  );
}

export default Navbar;