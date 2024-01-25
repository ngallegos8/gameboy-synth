import './App.css';
import React from 'react';
// import NavBar from "./NavBar";
import Header from "./components/Header";
import Synthesizer from "./components/Synthesizer";
import About from "./pages/About";
import Manual from "./pages/Manual";
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        
      </header>
      <main>
        <Synthesizer />
        {/* <About /> */}
        {/* <Manual /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
