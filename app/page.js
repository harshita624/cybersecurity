"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSpring, animated } from "@react-spring/web";
import { useSession, signIn, signOut } from "next-auth/react"; 
import { Shield, Bell, Lock, Book, ChevronRight, X, CheckCircle } from 'lucide-react';
import ImageRecognition from "./components/ImageRecognition";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // State Management
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState("");
  const [scanResults, setScanResults] = useState(null);

  // Security Tools
  const securityTools = [
    {
      name: "Threat Scanner",
      description: "Real-time vulnerability detection",
      icon: <Shield className="w-8 h-8 text-[#00F5D4]" />,
      action: "Scan Now",
      onClick: () => triggerScan(),  // Call triggerScan when the button is clicked
    },
    {
      name: "Password Vault",
      description: "Secure credential management",
      icon: <Lock className="w-8 h-8 text-[#00F5D4]" />,
      action: "Manage Passwords"
    },
    {
      name: "Incident Response",
      description: "Rapid threat mitigation",
      icon: <Bell className="w-8 h-8 text-[#00F5D4]" />,
      action: "Activate Response"
    },
    {
      name: "Security Guide",
      description: "Comprehensive protection strategies",
      icon: <Book className="w-8 h-8 text-[#00F5D4]" />,
      action: "View Guide"
    }
  ];
  const heroAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });
  // Pricing Packages
  const securityPackages = [
    {
      name: "Individual Shield",
      price: "$9.99",
      features: [
        "Personal Threat Monitoring",
        "Basic Incident Response",
        "Monthly Security Report"
      ]
    },
    {
      name: "Business Armor",
      price: "$49.99",
      features: [
        "Enterprise-Grade Protection",
        "24/7 Threat Monitoring",
        "Advanced Incident Response",
        "Compliance Management"
      ]
    },
    {
      name: "Enterprise Fortress",
      price: "Custom",
      features: [
        "Dedicated Security Team",
        "Comprehensive Risk Assessment",
        "Continuous Threat Intelligence",
        "Customized Security Protocols"
      ]
    },
    {
      name: "Free Shield",
      price: "Free",
      features: [
        "Basic Threat Monitoring",
        "Email Support",
        "Weekly Security Tips"
      ]
    }
  ];
  const triggerScan = () => {
    setSubscribeMessage("Scanning for vulnerabilities, please wait...");

    // Simulate a delay for the scan (e.g., 2 seconds)
    setTimeout(() => {
      // Simulate scan results
      const results = { status: "No vulnerabilities found", level: "Safe" };
      setScanResults(results); // Set scan results
      setSubscribeMessage(`Scan complete: ${results.status}`); // Update message
    }, 2000);
  };

  


  // FAQ Data
  const faqData = [
    {
      question: "How do we protect against emerging threats?",
      answer: "We use advanced AI-powered threat detection and continuous monitoring to identify and mitigate potential security risks in real-time."
    },
    {
      question: "What makes our approach unique?",
      answer: "Our proactive cybersecurity strategy combines cutting-edge technology, expert analysis, and personalized protection mechanisms."
    },
    {
      question: "How quickly can we respond to incidents?",
      answer: "Our rapid response team provides immediate intervention, with initial assessment and action within 15 minutes of threat detection."
    }
  ];

  // Team Members
  const teamMembers = [
    {
      name: "Elena Rodriguez",
      role: "Chief Security Architect",
      image: "/images/alex.jpg"
    },
    {
      name: "Marcus Chen",
      role: "Threat Intelligence Lead",
      image: "/images/sara.jpeg"
    },
    {
      name: "Aria Patel",
      role: "Incident Response Director",
      image: "/images/chris.jpg"
    }
  ];

  // Newsletter Subscription Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email
    if (!email || !email.includes('@')) {
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email,
          name: name // Optional: If you want to capture name as well
        }),
      });
  
      // Add more robust error handling
      if (!response.ok) {
        // Try to parse error message, but handle cases where response might not be JSON
        let errorMessage = "Subscription failed. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, use text
          try {
            errorMessage = await response.text();
          } catch {
            // Fallback to generic error
            errorMessage = `Error ${response.status}: ${response.statusText}`;
          }
        }
  
        setSubscribeMessage(errorMessage);
        return;
      }
  
      // Parse response
      const responseData = await response.json();
  
      // Clear the email input
      setEmail("");
      
      // Set a success message
      setSubscribeMessage("Subscription successful! Check your email.");
  
      // Redirect to nearest police station page
      router.push("/nearest-station");
  
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("Subscription Error:", error);
      setSubscribeMessage(error.message || "An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            CyberShield
          </div>
          <div className="space-x-6">
            <a href="#" className="text-gray-300 hover:text-[#00F5D4]">Home</a>
            <a href="/about" className="text-gray-300 hover:text-[#00F5D4]">About</a>
            <a href="/blog" className="text-gray-300 hover:text-[#00F5D4]">Blog</a>
            <a href="/services" className="text-gray-300 hover:text-[#00F5D4]">Services</a>
            <a href="/contact" className="text-gray-300 hover:text-[#00F5D4]">Contact</a>
          </div>
          {session ? (
            <button 
              onClick={() => signOut()}
              className="px-6 py-2 bg-[#7B61FF] text-white rounded-lg hover:bg-opacity-90"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => router.push('/signin')}
              className="px-6 py-2 bg-[#00F5D4] text-black rounded-lg hover:bg-opacity-90"
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Hero Section */}
        <section className="text-center py-24">
  <animated.div style={heroAnimation}>
    <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF] mb-6">
      Advanced Cybersecurity Solutions
    </h1>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
      Protect your digital ecosystem with intelligent, adaptive security strategies that anticipate and neutralize threats before they emerge.
    </p>
    <div className="flex justify-center space-x-6">
      <a href="/form"><button className="px-10 py-4 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-opacity-90">
        Start Protection
      </button>
      </a>
      <a href="/learn"><button className="px-10 py-4 border border-[#7B61FF] text-[#7B61FF] rounded-lg hover:bg-[#7B61FF]/10">
        Learn More
      </button>
      </a>
    </div>
  </animated.div>
</section>
        {/* Security Tools */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {securityTools.map((tool, index) => (
            <div key={index} className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 hover:border-[#00F5D4] transition-all">
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#00F5D4]">{tool.name}</h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              {scanResults ? (
                <div className="text-green-400">{scanResults.status} - {scanResults.level}</div>
              ) : (
                <button onClick={tool.onClick} className="flex items-center text-[#00F5D4] hover:text-opacity-80">
                  {tool.action}
                  <ChevronRight className="ml-2" />
                </button>
              )}
            </div>
          ))}
        </section>

        <section id="image-recognition" className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Image Recognition Tool
          </h2>
          <ImageRecognition />
        </section>
        


        {/* Pricing */}
        <section id="pricing" className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Flexible Security Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {securityPackages.map((pkg, index) => (
              <div 
                key={index}
                className="bg-[#1A1A1A] border border-[#333] rounded-xl p-8 hover:border-[#7B61FF] transition-all"
              >
                <h3 className="text-2xl font-semibold text-[#00F5D4] mb-4">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {pkg.price}
                  <span className="text-base text-gray-400 ml-2">
                    {pkg.price === "Custom" ? "/ tailored" : "/ month"}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="mr-3 text-[#00F5D4]" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-[#7B61FF] text-white rounded-lg hover:bg-opacity-90">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Meet Our Cybersecurity Experts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 text-center hover:border-[#00F5D4] transition-all"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-[#00F5D4]">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 hover:border-[#7B61FF] transition-all"
              >
                <h3 className="text-xl font-semibold text-[#00F5D4] mb-4">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section id="contact" className="py-16 bg-[#1A1A1A] rounded-xl">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
              Stay Ahead of Threats
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for the latest cybersecurity insights, threat intelligence, and protection strategies.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] rounded-lg focus:border-[#00F5D4]"
              />
              <button 
                type="submit"
                className="w-full py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-opacity-90"
              >
                Subscribe Now
              </button>
            </form>
            {subscribeMessage && (
              <p className="mt-4 text-[#00F5D4]">{subscribeMessage}</p>
            )}
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