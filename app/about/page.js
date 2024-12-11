"use client";

import React from "react";
import { Shield, Users, Target, Lock, BookOpen, CheckCircle } from 'lucide-react';
import { useSpring, animated } from "@react-spring/web";

export default function About() {
  const heroAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  const coreValues = [
    {
      name: "Integrity",
      description: "Unwavering commitment to ethical cybersecurity practices",
      icon: <Shield className="w-8 h-8 text-[#00F5D4]" />
    },
    {
      name: "Innovation",
      description: "Continuously evolving to stay ahead of emerging threats",
      icon: <Target className="w-8 h-8 text-[#00F5D4]" />
    },
    {
      name: "Protection",
      description: "Comprehensive digital security for individuals and businesses",
      icon: <Lock className="w-8 h-8 text-[#00F5D4]" />
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            CyberShield
          </div>
          <div className="space-x-6">
            <a href="/" className="text-gray-300 hover:text-[#00F5D4]">Home</a>
            <a href="/about" className="text-gray-300 hover:text-[#00F5D4]">About</a>
            <a href="/blog" className="text-gray-300 hover:text-[#00F5D4]">Blog</a>
            <a href="/services" className="text-gray-300 hover:text-[#00F5D4]">Services</a>
            <a href="/contact" className="text-gray-300 hover:text-[#00F5D4]">Contact</a>
          </div>
          <button 
            className="px-6 py-2 bg-[#00F5D4] text-black rounded-lg hover:bg-opacity-90"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Section */}
        <animated.section style={heroAnimation} className="text-center py-24">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF] mb-6">
            About CyberShield
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Pioneering intelligent cybersecurity solutions that protect, empower, and innovate in the digital landscape.
          </p>
        </animated.section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We are dedicated to transforming cybersecurity through cutting-edge technology, proactive threat intelligence, and personalized protection strategies. Our goal is to empower individuals and organizations to navigate the digital world with confidence and resilience.
              </p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-8">
              <Users className="w-12 h-12 text-[#00F5D4] mb-4" />
              <h3 className="text-2xl font-semibold text-[#00F5D4] mb-4">
                Comprehensive Digital Protection
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="mr-3 text-[#00F5D4]" size={20} />
                  Advanced Threat Detection
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="mr-3 text-[#00F5D4]" size={20} />
                  Proactive Security Strategies
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="mr-3 text-[#00F5D4]" size={20} />
                  Continuous Monitoring
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 hover:border-[#00F5D4] transition-all"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#00F5D4]">
                  {value.name}
                </h3>
                <p className="text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Technologies We Employ
          </h2>
          <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-8 text-center">
            <BookOpen className="w-16 h-16 text-[#00F5D4] mx-auto mb-6" />
            <p className="text-gray-300 max-w-4xl mx-auto text-lg">
              Our technology stack combines artificial intelligence, machine learning, advanced encryption, and real-time threat intelligence to create a comprehensive and adaptive security ecosystem that anticipates and neutralizes digital threats.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 mt-16 border-t border-[#333]">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
              CyberShield
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-[#00F5D4]">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-[#00F5D4]">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-[#00F5D4]">Contact</a>
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