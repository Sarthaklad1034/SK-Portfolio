import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import profileImage from '../../assets/images/profile.png';
import resumePDF from '../../assets/resume/resume.pdf';

const Hero = () => {
  const socialLinks = [
    {
      icon: GithubIcon,
      href: "https://github.com/Sarthaklad1034",
      label: "GitHub"
    },
    {
      icon: LinkedinIcon,
      href: "https://www.linkedin.com/in/sarthak-lad/",
      label: "LinkedIn"
    },
    {
      icon: MailIcon,
      href: "mailto:sarthaklad1034@gmail.com",
      label: "Email"
    }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Sarthak_Lad_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Empowering through secure web innovation.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Crafting innovative web applications and securing systems with advanced network & information security practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Resume
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              >
                Contact Me
              </button>
            </div>

            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 opacity-10 absolute -inset-4" />
            <img
              src={profileImage}
              alt="Developer Profile"
              className="rounded-full relative z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;