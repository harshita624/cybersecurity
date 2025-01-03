"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSpring, animated } from "@react-spring/web";
import { useSession, signIn, signOut, Session } from "next-auth/react"; 
import { Shield, Bell, Lock, Book, ChevronRight, X, CheckCircle } from 'lucide-react';
import Papa from "papaparse";
import ThreatDetectionPrediction from './components/ThreatDetectionPrediction';
import ImageRecognition from "./components/ImageRecognition";
import VirusTotalScanner from './components/VirusTotalScanner';

export default function Home() {
  // Session and Router Management
  const { data: session } = useSession(); 
  const router = useRouter();

  // State Management
  const [threatData, setThreatData] = useState("");
  const [detectionResult, setDetectionResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [name, setName] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const scanResults = null;
  const [url, setUrl] = useState(""); // Initialize the state for the URL


  useEffect(() => {
    setIsMounted(true);
    const currentLocation = window.location;
    console.log(currentLocation);
  }, []);
  
  
const heroAnimation = useSpring({
  from: { opacity: 0, transform: "translateY(-50px)" },
  to: { opacity: 1, transform: "translateY(0px)" },
  delay: 200,
});
  // Only proceed with render if mounted
  if (!isMounted) {
    return null;
  }
  const openSignInModal = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false);
  };

  const openSignUpModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  // Static Data Collections
  const securityTools = [
    {
      name: "Threat Scanner",
      description: "Real-time vulnerability detection",
      icon: <Shield className="w-8 h-8 text-[#00F5D4]" />,
      action: "Scan Now",
      onClick: () => {
        // Trigger a real-time scan
        alert("Starting Threat Scanner...");
        // Add logic to invoke the scanning functionality here
        triggerScan();
      },
    },
    {
      name: "Password Vault",
      description: "Secure credential management",
      icon: <Lock className="w-8 h-8 text-[#00F5D4]" />,
      action: "Manage Passwords",
      onClick: () => {
        // Redirect to password management
        window.location.href = "/password-vault";
      },
    },
    {
      name: "Incident Response",
      description: "Rapid threat mitigation",
      icon: <Bell className="w-8 h-8 text-[#00F5D4]" />,
      action: "Activate Response",
      onClick: () => {
        // Show incident response options
        alert("Incident Response Activated!");
        // Implement response activation logic here
      },
    },
    {
      name: "Security Guide",
      description: "Comprehensive protection strategies",
      icon: <Book className="w-8 h-8 text-[#00F5D4]" />,
      action: "View Guide",
      onClick: () => {
        // Redirect to the security guide page
        window.location.href = "/security-guide";
      },
    },
  ];
  
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

  // Event Handlers
  const handleThreatDetection = async (e) => {
    e.preventDefault();
    let inputToSend = threatData;

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const csvData = fileReader.result;
        const parsedData = Papa.parse(csvData, { header: true }).data;
        inputToSend = JSON.stringify(parsedData);
        await sendThreatDetectionRequest(inputToSend);
      };
      fileReader.readAsText(file);
    } else if (threatData) {
      await sendThreatDetectionRequest(inputToSend);
    } else {
      setDetectionResult("Please provide input for detection.");
    }
  };

  const sendThreatDetectionRequest = async (input) => {
    setIsScanning(true);
    setDetectionResult("Scanning for threats...");

    try {
      const response = await fetch('/api/threat-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const result = await response.json();
      if (response.ok) {
        setDetectionResult(`Scan complete: ${result.message}`);
      } else {
        setDetectionResult("Scan failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during scan:", error);
      setDetectionResult("Error during scan. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };
  const handleScanURL = (e) => {
    e.preventDefault(); // Prevent form submission
    
    const url = e.target.url.value; // Get the URL entered in the form
    console.log("Scanning URL:", url); // Log the URL for now (you can replace this with your actual scanning logic)
    
    // You can add logic here to process the URL, like sending it to an API or performing a scan.
  };
  
  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSignInError(""); // Clear any previous errors

    try {
        const res = await signIn("credentials", { // Use signIn from next-auth/react
            redirect: false, // Prevent default redirect behavior
            email,
            password,
        });

        if (res?.error) {
            setSignInError(res.error);
        } else {
            router.push("/"); // Manually redirect on success
        }
    } catch (error) {
        console.error("Sign-in error:", error);
        setSignInError("An error occurred during sign-in.");
    } finally {
        setIsLoading(false);
    }
  };




  
    // Handle form submission for sign-up
  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSignUpError(""); // Clear any previous errors

    try {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.success) {
            setSignUpError(data.message); // Show error if signup fails
        } else {
            router.push("/login"); // Redirect to login page after successful signup
        }
    } catch (error) {
        console.error("Sign-up error:", error);
        setSignUpError("An error occurred during sign-up.");
    } finally {
        setIsLoading(false);
    }
  };
  
  const triggerScan = async () => {
    setSubscribeMessage("Scanning for vulnerabilities, please wait...");
    
    try {
        const response = await fetch('/api/threat-detection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: "Sample input for detection" }),
        });

        const result = await response.json();

        if (response.ok) {
            setSubscribeMessage(`Scan complete: ${result.message}`);
        } else {
            setSubscribeMessage("Scan failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during threat detection:", error);
        setSubscribeMessage("Error during scan. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }
  
    setIsLoading(true);
    setSubscribeMessage("");
  
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(),
          name: name.trim() 
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        setSubscribeMessage(responseData.message || "Subscription failed. Please try again.");
        return;
      }
  
      setEmail("");
      setName("");
      setSubscribeMessage("Subscription successful! Your details are now sent to the police.");
  
      setTimeout(() => {
        router.push("/nearest-station");
      }, 2000);
  
    } catch (error) {
      console.error("Subscription Error:", error);
      setSubscribeMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
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
            <button
              onClick={() => setShowSignInModal(true)}
              className="bg-[#00F5D4] text-black px-4 py-2 rounded-lg"
            >
              Sign In
            </button>
             {/* Sign-Up Button */}
      <button onClick={openSignUpModal}  className="bg-[#00F5D4] text-black px-4 py-2 rounded-lg">Sign Up</button>

            {/* Sign-In Modal */}
            {showSignInModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg max-w-md w-full">
                  <h2 className="text-3xl font-semibold text-[#00F5D4] mb-6 text-center">Sign In</h2>
                  <form onSubmit={handleSubmitSignIn}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 mt-2 bg-[#2A2A2A] border border-[#333] rounded-lg text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="w-full px-4 py-3 mt-2 bg-[#2A2A2A] border border-[#333] rounded-lg text-white"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-2 right-3 text-gray-300"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    {signInError && (
                      <p className="text-red-500 text-sm mb-4">{signInError}</p>
                    )}
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-[#00D2A1] transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                  </form>
                  <div className="text-center mt-4">
                    <button 
                      className="text-sm text-[#7B61FF] hover:underline"
                      onClick={() => setShowSignInModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sign-Up Modal */}
{showSignUpModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-semibold text-[#00F5D4] mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmitSignUp}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 mt-2 bg-[#2A2A2A] border border-[#333] rounded-lg text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 mt-2 bg-[#2A2A2A] border border-[#333] rounded-lg text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {signUpError && (
          <p className="text-red-500 text-sm mb-4">{signUpError}</p>
        )}
        <button 
          type="submit" 
          className="w-full py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-[#00D2A1] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="text-center mt-4">
        <button 
          className="text-sm text-[#7B61FF] hover:underline"
          onClick={() => setShowSignUpModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

          </div>
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
{/* Page Title */}
<header className="text-center py-12">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF] mb-4">
        Scan URL for Threats
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Enter a URL to check for potential security risks, malware, and phishing attempts. 
        Protect your digital space with CyberShield.
      </p>
    </header>

    {/* Scan Form */}
    <section className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-lg">
      <form onSubmit={handleScanURL}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="url">
            Enter URL
          </label>
          <input
            type="url"
            id="url"
            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333] rounded-lg text-white"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Scanning..." : "Scan URL"}
        </button>
      </form>
    </section>

    {/* Scan Results */}
    {scanResults && (
      <section className="mt-12 bg-[#1A1A1A] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#00F5D4] mb-6">Scan Results</h2>
        <pre className="text-sm text-gray-300 bg-[#2A2A2A] p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(scanResults, null, 2)}
        </pre>
      </section>
    )}


  
               {/* Threat Detection Form */}
               <section className="py-16 mt-16 bg-[#1A1A1A] rounded-xl shadow-lg">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
      Threat Detection
    </h2>
    <p className="text-gray-300 mb-12">
      Analyze your data for potential threats using advanced algorithms. Enter data manually or upload a CSV file to start scanning.
    </p>

    <form onSubmit={handleThreatDetection} className="bg-[#2A2A2A] p-8 rounded-lg shadow-md">
      <textarea
        value={threatData}
        onChange={(e) => setThreatData(e.target.value)}
        className="w-full p-4 text-white bg-[#1A1A1A] border border-[#333] rounded-md focus:ring-2 focus:ring-[#00F5D4]"
        placeholder="Enter the data to scan for threats..."
        rows="6"
      />

      <div className="mt-6 text-left">
        <label
          htmlFor="csv-file"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Or upload a CSV file:
        </label>
        <input
          type="file"
          id="csv-file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full p-3 bg-[#1A1A1A] border border-[#333] rounded-md text-gray-300 focus:ring-2 focus:ring-[#00F5D4]"
        />
      </div>

      <button 
        type="submit" 
        className="mt-8 w-full py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all"
        disabled={isScanning}
      >
        {isScanning ? "Scanning..." : "Scan Now"}
      </button>
    </form>

    {/* Display scan result */}
    {detectionResult && (
      <div className="mt-8 p-6 bg-[#333333] rounded-lg shadow-md">
        <p className="text-gray-300 text-lg font-medium">{detectionResult}</p>
      </div>
    )}
  </div>
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
        {/* Newsletter Subscription */}
<section id="subscription" className="py-16 bg-[#1A1A1A] rounded-xl shadow-lg">
  <h2 className="text-4xl font-bold text-center text-[#00F5D4] mb-6">
    Subscribe for Updates
  </h2>
  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
    <div className="flex space-x-4">
      <input 
        type="email" 
        placeholder="Enter your email"
        className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333] rounded-lg text-white placeholder:text-gray-300"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button 
        type="submit" 
        className="px-6 py-3 bg-[#00F5D4] text-black font-semibold rounded-lg hover:bg-[#00D2A1] transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </button>
    </div>
    {subscribeMessage && (
      <p className="mt-4 text-center text-gray-300">{subscribeMessage}</p>
    )}
  </form>
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