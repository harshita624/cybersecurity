import React from 'react';
import { Shield, Lock, BookOpen, CloudCog, ChevronRight } from 'lucide-react';

export default function LearnMore() {
  const cybersecurityFeatures = [
    {
      name: "Incident Reporting",
      description: "Quickly detect, report, and respond to security incidents with our advanced platform.",
      icon: <Shield className="w-8 h-8 text-[#00F5D4]" />
    },
    {
      name: "Security Assessments",
      description: "In-depth vulnerability analysis and comprehensive security evaluations.",
      icon: <Lock className="w-8 h-8 text-[#00F5D4]" />
    },
    {
      name: "Cybersecurity Training",
      description: "Empower your team with cutting-edge threat prevention knowledge.",
      icon: <BookOpen className="w-8 h-8 text-[#00F5D4]" />
    }
  ];

  const cybersecurityStats = [
    {
      value: "$10 Trillion",
      description: "Global cybercrime damages expected in 2025"
    },
    {
      value: "60%",
      description: "Percentage of small businesses that close after a cyberattack"
    },
    {
      value: "50%",
      description: "Percentage of data breaches caused by human error"
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
        </nav>

        {/* Hero Section */}
        <section className="text-center py-24">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF] mb-6">
            Advanced Cybersecurity Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Explore comprehensive protection strategies designed to safeguard your digital ecosystem from evolving cyber threats.
          </p>
        </section>

        {/* Cybersecurity Features */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {cybersecurityFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 hover:border-[#00F5D4] transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#00F5D4]">{feature.name}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Cybersecurity Statistics */}
        <section className="bg-[#1A1A1A] rounded-xl py-16 mb-24">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Cybersecurity by the Numbers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 px-8">
            {cybersecurityStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-[#0A0A0A] border border-[#333] rounded-xl p-8 hover:border-[#7B61FF] transition-all"
              >
                <h4 className="text-4xl font-bold text-[#00F5D4] mb-4">{stat.value}</h4>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Ready to Protect Your Organization?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Take the first step towards comprehensive cybersecurity with our tailored solutions.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="/form">
              <button className="px-10 py-4 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-opacity-90">
                Get Started
              </button>
            </a>
            <a href="/contact">
              <button className="px-10 py-4 border border-[#7B61FF] text-[#7B61FF] rounded-lg hover:bg-[#7B61FF]/10">
                Request Consultation
              </button>
            </a>
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