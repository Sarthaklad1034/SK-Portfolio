import React from 'react';
import profileImage from '../../assets/images/profile1.jpeg';
import { motion } from 'framer-motion';
import { Code2, Brain, Shield, Search } from 'lucide-react';

const AboutCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
  >
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const About = () => {
  const specialties = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building scalable applications with modern frameworks and best practices."
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Tackling complex challenges with innovative and efficient solutions."
    },
    {
      icon: Shield, // You'll need to import Shield from 'lucide-react'
      title: "Information Security",
      description: "Implementing robust security measures to protect systems and applications"
    },
    {
      icon: Search, // You'll need to import Search from 'lucide-react'
      title: "Security Integration",
      description: "Ensuring best practices and protections throughout the development lifecycle."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 dark:text-white">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
          Experienced Full-Stack Developer with 3+ years of expertise in PHP/Laravel and MERN Stack, specializing in scalable, secure, and user-centric web applications. Also an Information Security Engineer and cyber enthusiast with a focus on secure coding and system optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AboutCard {...specialty} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">My Journey</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                I am Sarthak Lad, an Information Technology student with a strong passion for exploring IT and Computer Science. My journey as a self-taught developer has fueled my interest in web technologies and modern development practices.
                </p>
                <p>
                  I enjoy solving technical challenges, developing innovative projects, and working in collaborative team environments. My experience spans academic and personal projects, with a focus on software development and emerging technologies.
                </p>
                <p>
                I am also gaining expertise in information and cybersecurity, with a special interest in penetration testing, vulnerability assessment, and network security.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={profileImage}
                  alt="Working on projects"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;