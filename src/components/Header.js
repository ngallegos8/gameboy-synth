import React from "react";
import NavBar from "./NavBar"
// import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        GameBoy Synth
      </h1>
      <div class="topnav">
        <NavLink to="/">Synth</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/manual">Manual</NavLink>
        {/* <NavBar /> */}
        {/* <Outlet /> */}
      </div>
    </header>
  );
}

export default Header;