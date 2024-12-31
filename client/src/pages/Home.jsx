// Modified Home.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import ScrollToTop from '../components/layout/ScrollToTop';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20">
          <About />
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-20 bg-white dark:bg-gray-800">
          <Skills />
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen py-20 bg-white dark:bg-gray-800">
          <Experience />
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20">
          <Contact />
        </section>
        <Navbar />
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;