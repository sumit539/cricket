import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import MatchHistory from './components/MatchHistory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Team />
              <Matches />
              <Testimonials />
              <Gallery />
              <VideoSection />
              <Contact />
            </>
          } />
          <Route path="/matches" element={<MatchHistory />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;