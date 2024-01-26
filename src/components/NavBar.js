// NavBar.js
import React from 'react';
import { NavLink , Outlet} from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <nav>
      {/* <NavLink to="/synth">Synth</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/manual">Manual</NavLink> */}
    </nav>
    <main>
      <Outlet />
    </main>
    </>
  );
};

export default NavBar;
