"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-white">
        <Sidebar /> {/* Sidebar for navigation */}

        <main className="flex-grow p-8">
          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
            <p className="text-lg text-gray-700 mt-2">
              Committed to protecting your personal data and ensuring a safer digital experience.
            </p>
          </motion.header>

          {/* Sections */}
          <ContentSection
            title="Our Mission"
            content={[
              "Our mission is to empower individuals by providing essential tools and knowledge to protect personal information in the online world. We aim to raise awareness about digital risks and equip users with resources to navigate the internet safely."
            ]}
          />

          <ContentSection
            title="Customer Service Commitment"
            content={[
              "Customer service lies at the core of our values. We ensure every client is treated with fairness and respect, and we handle all queries with promptness and integrity.",
              "Our passionate team works tirelessly to exceed user expectations, ensuring safety and satisfaction are never compromised. Your needs are our priority, and we strive to deliver solutions that make a difference."
            ]}
          />

          <ContentSection
            title="The People Behind the Vision"
            content={[
              "Our success is driven by a talented and diverse team committed to digital safety. From cybersecurity experts to customer service specialists, each member plays a vital role in achieving our mission.",
              "Together, we work towards creating a safer digital space for all users by providing exceptional support and sharing our knowledge."
            ]}
          />

          <ContentSection
            title="Technologies We Use"
            content={[
              "To stay ahead in the evolving digital landscape, we leverage advanced technologies in cybersecurity. From encryption protocols to AI-powered threat detection, our systems are designed to provide real-time protection.",
              "We prioritize reliability and speed to ensure that your data remains secure while maintaining seamless service delivery."
            ]}
          />

          <ContentSection
            title="Our Core Values"
            content={[
              "Integrity, transparency, and fairness are the cornerstones of our organization. We treat every client equally and are committed to addressing concerns with the utmost seriousness.",
              "Empowering users, safeguarding their digital rights, and ensuring online safety are at the heart of everything we do. These values guide every decision we make and shape our vision for a better digital future."
            ]}
          />
        </main>
      </div>
      <Footer className="w-full" />
    </>
  );
};

// Reusable Content Section Component
const ContentSection = ({ title, content }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-white p-6 rounded-lg shadow-lg mb-10 border-l-4 border-blue-500"
  >
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h2>
    {content.map((paragraph, idx) => (
      <p key={idx} className="text-gray-700 mb-4">
        {paragraph}
      </p>
    ))}
  </motion.section>
);

// Sidebar Component
const Sidebar = () => (
  <aside className="w-64 p-6 bg-blue-50 border-r border-gray-200 shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Navigation</h2>
    <ul className="space-y-4">
      {["Home", "About", "Services", "Blog", "Contact"].map((item) => (
        <li key={item}>
          <a
            href={`/${item.toLowerCase()}`}
            className="text-gray-700 hover:text-blue-600 hover:underline transition duration-300"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

export default About;
