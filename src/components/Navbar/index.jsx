import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { toaster } from "evergreen-ui";
import "./navbar.css";
import faker from "faker";
import UserService from "../../services/user_service";
import AddProfile from '../../views/Students/Profile/add_profile'

function Navbar() {
  const history = useHistory();
  const current_user = UserService.currentUser();
  const [student, setStudent] = useState([])
  const [activeItem, setActiveItem] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogout = (event) => {
    localStorage.removeItem("access_token");
    toaster.success("Logout Successful, See you soon!", { duration: 3 });
    history.push("/login");
  };

  useEffect(() => {
    setLoading(true)
    UserService.student(current_user.id).then(
      (res) => {
        setStudent(res.data.student)
        setLoading(true)
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toaster.notify(returnError, { duration: 5 })
        setLoading(true)
      }
    )
  }, [])


  const handleItemClick = (e, { name }) => setActiveItem(name);

  const trigger = (
    <span>
      <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
    </span>
  );

  const options = [
    { key: "user", text: "Account", icon: "user" },
    { key: "sign-out", text: "Sign Out", icon: "sign out" },
  ];

  return (
    <div className="navigation">
      <Menu secondary>
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
          to={"/"}
        />
        {current_user ? (
          <Menu.Menu position="right">
            {student.length === 0 ?
              <AddProfile
                theTrigger={<Menu.Item
                  name="create profile"
                  text="create profile"
                />}
                user_id={current_user.id}
              />
              :
              <Menu.Item
                name="profile"
                active={activeItem === "profile"}
                onClick={handleItemClick}
                as={NavLink}
                to={"/students/" + current_user.id}
              />
            }
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleLogout}
            />
          </Menu.Menu>
        ) : (
            <Menu.Menu position="right">
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                as={NavLink}
                to="/login"
              />
            </Menu.Menu>
          )}
      </Menu>
    </div>
  );
}

export default Navbar;
