// pages/services.js

// pages/services.js
"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaHandsHelping, FaUsers, FaRocket } from 'react-icons/fa'; // Example icons

const Services = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">
          We offer a range of specialized services designed to safeguard your online presence and empower you with knowledge to stay safe in the digital world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full px-4">
          {/** Card 1 **/}
          <ServiceCard 
            imgSrc="/images/s1.jpeg"
            imgAlt="Campaign for Security Awareness"
            title="Campaign for Security Awareness"
            description="We run extensive campaigns to raise awareness about security issues and best practices for safeguarding your personal information."
            link="/campaign"
            icon={<FaShieldAlt className="text-4xl text-blue-600 mb-4" />}
          />

          {/** Card 2 **/}
          <ServiceCard 
            imgSrc="/images/s2.jpeg"
            imgAlt="Collaboration with Police and Government"
            title="Collaboration with Police and Government"
            description="Our partnership with law enforcement agencies ensures faster identification and resolution of theft incidents, making your safety our priority."
            link="/police-collaboration"
            icon={<FaHandsHelping className="text-4xl text-blue-600 mb-4" />}
          />

          {/** Card 3 **/}
          <ServiceCard 
            imgSrc="/images/s3.png"
            imgAlt="Fast Customer Service for Victims"
            title="Fast Customer Service for Victims"
            description="We provide prompt assistance to victims of cybercrime, ensuring they receive the help they need when they need it the most."
            link="/customer-service"
            icon={<FaUsers className="text-4xl text-blue-600 mb-4" />}
          />

          {/** Card 4 **/}
          <ServiceCard 
            imgSrc="/images/s4.png"
            imgAlt="Advanced Technology for Better Experience"
            title="Advanced Technology for Better Experience"
            description="Our advanced technology solutions ensure a seamless user experience, helping you manage your security needs with ease."
            link="/advanced-technology"
            icon={<FaRocket className="text-4xl text-blue-600 mb-4" />}
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-gray-600 mb-4">Ready to enhance your security?</p>
          <Link href="/contact" passHref>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Reusable Service Card Component
const ServiceCard = ({ imgSrc, imgAlt, title, description, link, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    {icon}
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <Link href={link} passHref>
      <h2 className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition duration-300 mb-2">
        {title}
      </h2>
    </Link>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default Services;
