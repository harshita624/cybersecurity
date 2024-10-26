"use client";

import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'; // Importing icons from react-icons
import { motion } from 'framer-motion'; // For animations

export default function Contact() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !phone || !message) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setErrorMessage('');

    // Here you can handle form submission logic (like sending data to an API)

    // Redirect to home page after form submission
    router.push('/');
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <motion.form 
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <div className="flex items-center border border-gray-300 rounded">
              <AiOutlineUser className="ml-3 text-gray-500" />
              <input 
                id="name"
                className="w-full px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400" 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded">
              <AiOutlineMail className="ml-3 text-gray-500" />
              <input 
                id="email"
                className="w-full px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400" 
                type="email" 
                placeholder="Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded">
              <AiOutlinePhone className="ml-3 text-gray-500" />
              <input 
                id="phone"
                className="w-full px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400" 
                type="tel" 
                placeholder="Your Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
            <textarea 
              id="message"
              className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm mb-4 font-semibold">{errorMessage}</p>
          )}
          <motion.button 
            className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-cyan-600 transition duration-200 ease-in-out"
            type="submit"
            whileHover={{ scale: 1.05 }} 
          >
            Submit
          </motion.button>
        </motion.form>
      </main>
    </div>
  );
}
