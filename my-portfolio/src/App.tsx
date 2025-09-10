import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import ContributionGraph from './sections/ContributionGraph';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Education from './sections/Education';
// import CustomCursor from './components/CustomCursor';

function App() {
  return (
    // <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Skills />
        <ContributionGraph />
        <Projects />
        <Contact />
        <Footer />
        {/* Other sections will go here */}
      </div>
    // </>
  );
}

export default App;
