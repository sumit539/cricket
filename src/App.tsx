import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Matches from './components/Matches';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Team />
      <Matches />
      <Testimonials />
      <Gallery />
      <VideoSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;