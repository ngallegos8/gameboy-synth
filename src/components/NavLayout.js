// NavLayout.js
import React from 'react';
// import NavBar from './NavBar';
import Header from './Header'; 
import Footer from './Footer'; 
// import { Outlet } from 'react-router-dom';

const NavLayout = () => {
  return (
    <div>
      <Header />
      {/* <NavBar /> */}
      <Footer />
    </div>
    
  );
};

export default NavLayout;
