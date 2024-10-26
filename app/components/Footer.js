"use client";

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full text-white text-center py-6 mt-auto bg-slate-900"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="mb-4">
          <p>© 2024 CyberSecure. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" aria-label="Facebook">
            <FaFacebook className="text-white hover:text-blue-600 transition duration-300" />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter className="text-white hover:text-blue-400 transition duration-300" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin className="text-white hover:text-blue-700 transition duration-300" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="text-white hover:text-pink-500 transition duration-300" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
