// pages/services.js

// pages/services.js
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Lock, Book, ChevronRight } from 'lucide-react';

export default function Services() {
  const serviceTools = [
    {
      name: "Security Awareness Campaign",
      description: "Comprehensive education on digital safety practices",
      icon: <Shield className="w-8 h-8 text-[#00F5D4]" />,
      link: "/campaign"
    },
    {
      name: "Law Enforcement Collaboration",
      description: "Strategic partnerships for rapid incident resolution",
      icon: <Bell className="w-8 h-8 text-[#00F5D4]" />,
      link: "/police-collaboration"
    },
    {
      name: "Victim Support Services",
      description: "Immediate and compassionate cybercrime assistance",
      icon: <Lock className="w-8 h-8 text-[#00F5D4]" />,
      link: "/customer-service"
    },
    {
      name: "Advanced Technology Solutions",
      description: "Cutting-edge security management tools",
      icon: <Book className="w-8 h-8 text-[#00F5D4]" />,
      link: "/advanced-technology"
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            CyberShield
          </div>
          <div className="space-x-6">
            <a href="/" className="text-gray-300 hover:text-[#00F5D4]">Home</a>
            <a href="/about" className="text-gray-300 hover:text-[#00F5D4]">About</a>
            <a href="/services" className="text-gray-300 hover:text-[#00F5D4]">Services</a>
          </div>
          <div className="flex space-x-4">
            <a href="/signin" className="px-4 py-2 border border-[#00F5D4] text-[#00F5D4] rounded-md hover:bg-[#00F5D4] hover:text-black transition-colors">
              Sign In
            </a>
            <a href="/contact" className="px-4 py-2 bg-[#00F5D4] text-black rounded-md hover:bg-opacity-90">
              Contact
            </a>
          </div>
        </nav>

        {/* Rest of the code remains the same */}
        <section className="text-center py-16">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF] mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Comprehensive cybersecurity solutions designed to protect, educate, and empower your digital ecosystem.
          </p>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {serviceTools.map((service, index) => (
              <div 
                key={index} 
                className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 hover:border-[#00F5D4] transition-all"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#00F5D4]">{service.name}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <a href={service.link} className="flex items-center text-[#00F5D4] hover:text-opacity-80">
                  Learn More
                  <ChevronRight className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A] rounded-xl">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
              Need Personalized Protection?
            </h2>
            <p className="text-gray-300 mb-8">
              Connect with our cybersecurity experts to develop a tailored security strategy.
            </p>
            <a href="/contact">
              <button className="w-full py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-opacity-90">
                Contact Our Team
              </button>
            </a>
          </div>
        </section>

        <footer className="py-12 mt-16 border-t border-[#333]">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
              CyberShield
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-[#00F5D4]">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-[#00F5D4]">Terms of Service</a>
            </div>
            <div className="text-gray-400">
              © 2024 CyberShield. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}