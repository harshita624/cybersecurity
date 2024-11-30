"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-purple-900 text-white text-center py-20 px-6"
        >
          <h1 className="text-5xl font-extrabold">About Us</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Empowering safer digital experiences with innovative solutions.
          </p>
        </motion.section>

        {/* Content Section */}
        <main className="container mx-auto px-6 lg:px-16 py-16 space-y-16">
          <ContentSection
            title="Our Mission"
            content={[
              "Our mission is to empower individuals and businesses by providing cutting-edge cybersecurity tools and knowledge. We aim to create a secure digital environment for everyone.",
            ]}
          />
          <ContentSection
            title="Customer Service Commitment"
            content={[
              "We prioritize exceptional customer service by providing prompt support and reliable solutions. Your security and satisfaction are our highest priorities.",
            ]}
          />
          <ContentSection
            title="The People Behind the Vision"
            content={[
              "A passionate and diverse team of cybersecurity experts drives our success. Together, we are dedicated to making the internet a safer place.",
            ]}
          />
          <ContentSection
            title="Technologies We Use"
            content={[
              "From AI-powered threat detection to advanced encryption protocols, we employ state-of-the-art technologies to protect against emerging threats.",
            ]}
          />
          <ContentSection
            title="Our Core Values"
            content={[
              "Integrity, transparency, and innovation define our work. We are committed to protecting digital rights and ensuring online safety for all.",
            ]}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

// Reusable Content Section Component
const ContentSection = ({ title, content }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300"
  >
    <h2 className="text-3xl font-bold text-purple-900 mb-4">{title}</h2>
    {content.map((paragraph, idx) => (
      <p key={idx} className="text-gray-700 text-lg leading-relaxed mb-4">
        {paragraph}
      </p>
    ))}
  </motion.section>
);

export default About;
