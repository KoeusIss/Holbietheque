import React from "react";
import { Menu, Container, Sticky } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toaster } from "evergreen-ui";
import UserService from "../../services/user_service";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const currentUser = UserService.currentUser();
  const profile = currentUser && currentUser.profile;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toaster.success("Logout Successful, See you soon!", { duration: 3 });
  };
  
  const userPath = () => {
    if (!profile) {
      return "/new"
    } else {
      if (currentUser.role === "student") {
        return "students/" + currentUser.profile
      }
      else if (currentUser.role === "recruiter") {
        return "recruiters/" + currentUser.profile
      }
    }
  }

  return (
    <Sticky>
      <Menu
        borderless
        style={{
          marginBottom: "0px",
          boxShadow: "none",
          minHeight: "60px",
          backgroundColor: "#2f2e41",
        }}
      >
        <Container>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            style={{ color: "#fff" }}
            as={NavLink}
            to="/"
          />
          <Menu.Item
            name="students"
            active={activeItem === "students"}
            style={{ color: "#fff" }}
            onClick={handleItemClick}
            as={NavLink}
            to="/students"
          />
          <Menu.Item
            name="about"
            active={activeItem === "about"}
            style={{ color: "#fff" }}
            onClick={handleItemClick}
            as={NavLink}
            to="/about"
          />
          <Menu.Menu position="right">
            {currentUser ? (
              <>
                <Menu.Item
                  name="profile"
                  active={activeItem === "profile"}
                  style={{ color: "#fff" }}
                  onClick={handleItemClick}
                  as={NavLink}
                  to={userPath}
                />
                <Menu.Item
                  name="logout"
                  active={activeItem === "logout"}
                  style={{ color: "#fff" }}
                  onClick={handleLogout}
                  as={NavLink}
                  to="/login"
                />
              </>
            ) : (
              <>
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  onClick={handleItemClick}
                  style={{ color: "#fff" }}
                  as={NavLink}
                  to="/login"
                />
                <Menu.Item
                  name="signup"
                  active={activeItem === "signup"}
                  onClick={handleItemClick}
                  style={{ color: "#fff" }}
                  as={NavLink}
                  to="/signup"
                />
              </>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </Sticky>
  );
};

export default Navbar;
