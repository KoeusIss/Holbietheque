import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import { Menu } from 'semantic-ui-react'

function Navbar({ status, changeStatus }) {
    const [activeItem, setActiveItem] = useState('')
  const handleLogout = (event) => {
    localStorage.removeItem("access_token");
    changeStatus(false);
  };

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
      <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={NavLink} to='/'
        />
        <Menu.Item
          name='students'
          active={activeItem === 'students'}
          onClick={handleItemClick}
          as={NavLink} to='/students'
        />
        <Menu.Item
          name='about'
          active={activeItem === 'about'}
          onClick={handleItemClick}
          as={NavLink} to='/about'
        />
        <Menu.Menu position='right'>
            { !status ?
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={NavLink} to='/login'
          />
          :
            <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={handleLogout}
          />
            }
        </Menu.Menu>
      </Menu>
  );
}
export default Navbar;
