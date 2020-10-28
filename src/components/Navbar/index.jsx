import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toaster } from "evergreen-ui";
import UserService from "../../services/user_service";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const user = UserService.currentUser();
  const profile_id = localStorage.getItem("pid");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("pid");
    toaster.success("Logout Successful, See you soon!", { duration: 3 });
  };

  return (
    <Menu
      borderless
      style={{ marginBottom: "0px", boxShadow: "none", minHeight: "60px" }}
    >
      <Container>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={NavLink}
          to="/"
        />
        <Menu.Item
          name="students"
          active={activeItem === "students"}
          onClick={handleItemClick}
          as={NavLink}
          to="/students"
        />
        <Menu.Item
          name="about"
          active={activeItem === "about"}
          onClick={handleItemClick}
          as={NavLink}
          to="/about"
        />
        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item
                name="profile"
                active={activeItem === "profile"}
                onClick={handleItemClick}
                as={NavLink}
                to={"/students/" + profile_id}
              />
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
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
                as={NavLink}
                to="/login"
              />
              <Menu.Item
                name="signup"
                active={activeItem === "signup"}
                onClick={handleItemClick}
                as={NavLink}
                to="/signup"
              />
            </>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
