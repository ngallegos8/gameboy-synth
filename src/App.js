import './App.css';
import React from 'react';
import NavBar from "./components/NavBar";
import Header from "./components/Header";
// import Synth from "./components/Synth";
// import About from "./pages/About";
// import Manual from "./pages/Manual";
import Footer from './Footer';
// import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
       
      </header>
      <main>
        <NavBar />
     
        {/* <Synth /> */}
        {/* <About /> */}
        {/* <Manual /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
