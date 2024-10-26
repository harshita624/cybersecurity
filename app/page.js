"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Alert } from './components/Alert'; // Adjust path if needed
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSpring, animated } from "@react-spring/web";
import { Shield, Bell, Lock, Book, ChevronRight, X } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  // State Management
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showNotification, setShowNotification] = useState(false);
  // Animations using react-spring
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 });
  const fadeInFast = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 150 });
  const slideUp = useSpring({ transform: "translateY(0px)", from: { transform: "translateY(100px)" }, delay: 400 });

  // Stats Data
  const stats = [
    { value: "5,000+", label: "Cases Resolved" },
    { value: "10,000+", label: "Active Users" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "How do I report a cybersecurity incident?",
      answer: "You can report an incident through our online form, which guides you through the necessary steps."
    },
    {
      question: "What happens after I submit a report?",
      answer: "Our team reviews your report within 24 hours. You'll receive a confirmation email with a case number and next steps."
    },
    {
      question: "How can I protect my online privacy?",
      answer: "We recommend using strong passwords, enabling two-factor authentication, and regularly updating your software."
    },
  ];
  const securityTools = [
    {
      name: "Password Checker",
      description: "Evaluate your password strength instantly",
      icon: <Lock className="w-6 h-6 text-purple-600" />,
      action: "Check Now"
    },
    {
      name: "Security Scanner",
      description: "Scan your system for vulnerabilities",
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      action: "Start Scan"
    },
    {
      name: "Threat Alerts",
      description: "Real-time security threat notifications",
      icon: <Bell className="w-6 h-6 text-purple-600" />,
      action: "Enable Alerts"
    },
    {
      name: "Security Guide",
      description: "Comprehensive security best practices",
      icon: <Book className="w-6 h-6 text-purple-600" />,
      action: "Read More"
    }
  ];

  // Pricing Packages Data
  const securityPackages = {
    personal: [
      {
        name: "Basic Protection",
        price: "$9.99/mo",
        features: ["Incident Response", "Basic Security Assessment", "Email Support"]
      },
      {
        name: "Advanced Security",
        price: "$24.99/mo",
        features: ["24/7 Support", "Advanced Threat Detection", "Priority Response", "Monthly Security Report"]
      }
    ],
    business: [
      {
        name: "Business Essential",
        price: "$99.99/mo",
        features: ["Enterprise Security Suite", "Dedicated Support Team", "Compliance Management"]
      },
      {
        name: "Enterprise Shield",
        price: "Custom",
        features: ["Custom Security Solutions", "24/7 Dedicated Team", "Advanced Threat Intelligence", "Regular Audits"]
      }
    ]
  };


  // Load and save reviews
  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error("Error parsing reviews:", error);
      }
    }
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = { name, reviewText, rating, timestamp: new Date().toISOString() }; // Use ISO string for consistency
    const updatedReviews = [...reviews, newReview];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setMessage("Review submitted successfully!");
    setName("");
    setReviewText("");
    setRating(0);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeMessage("Thank you for subscribing!");
      setEmail("");
    }
  };

  const handleReportIncident = () => {
    router.push('/form'); // Replace with the actual path to your form page
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <animated.section style={fadeIn} className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-purple-900 mb-6 animate-fadeIn">Secure Your Digital Life</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Your trusted partner in cybersecurity. We provide comprehensive solutions to protect your digital assets and privacy.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors animate-bounce"
              onClick={handleReportIncident}
            >
              Report an Incident
            </button>
            <button
              className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg shadow-lg hover:bg-purple-50 transition-colors"
              onClick={() => {}}
            >
              Explore Resources
            </button>
          </div>
        </animated.section>

        {/* Stats Section */}
        <animated.section style={slideUp} className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center hover:-translate-y-1 transition-transform">
              <h2 className="text-4xl font-bold text-purple-600">{stat.value}</h2>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </animated.section>

        {/* Services Section */}
        <animated.section style={fadeInFast} className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ title: "Incident Response", icon: "🛡️", description: "24/7 support for cybersecurity incidents" },
              { title: "Security Assessment", icon: "🔒", description: "Comprehensive security audits and recommendations" },
              { title: "Training & Education", icon: "📚", description: "Expert-led cybersecurity training programs" }].map((service, index) => (
              <div key={index} className="bg-white shadow-md p-6 rounded-lg hover:-translate-y-1 transition-transform">
                <div className="flex justify-center mb-4 text-5xl">{service.icon}</div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </animated.section>
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
     
      {/* Security Tools Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-8">Security Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {securityTools.map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <button className="flex items-center text-purple-600 hover:text-purple-700">
                {tool.action}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
        <p className="text-gray-500 mt-4">Choose a plan that fits your needs.</p>
      </div>
      
      <div className="mt-10 grid gap-6 md:grid-cols-3 justify-center">
        
        {/* Free Plan */}
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-purple-700">Free Plan</h3>
          <p className="mt-2 text-gray-500">Perfect for personal use.</p>
          <div className="text-4xl font-bold mt-4">Free</div>
          <ul className="mt-6 space-y-4">
            <li className="text-gray-600">Basic Support</li>
            <li className="text-gray-600">Access to All Free Resources</li>
            <li className="text-gray-600">Limited Incident Reports</li>
          </ul>
          <button className="w-full bg-purple-700 text-white mt-8 py-2 rounded-lg hover:bg-purple-800 transition">
            Select Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-purple-700">Premium Plan</h3>
          <p className="mt-2 text-gray-500">Ideal for small businesses.</p>
          <div className="text-4xl font-bold mt-4">$29<span className="text-xl text-gray-500">/month</span></div>
          <ul className="mt-6 space-y-4">
            <li className="text-gray-600">24/7 Support</li>
            <li className="text-gray-600">Advanced Incident Reports</li>
            <li className="text-gray-600">Access to Premium Resources</li>
          </ul>
          <button className="w-full bg-purple-700 text-white mt-8 py-2 rounded-lg hover:bg-purple-800 transition">
            Select Plan
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-purple-700">Enterprise Plan</h3>
          <p className="mt-2 text-gray-500">For large organizations with complex needs.</p>
          <div className="text-4xl font-bold mt-4">$99<span className="text-xl text-gray-500">/month</span></div>
          <ul className="mt-6 space-y-4">
            <li className="text-gray-600">Dedicated Account Manager</li>
            <li className="text-gray-600">Priority Support</li>
            <li className="text-gray-600">Custom Security Assessments</li>
          </ul>
          <button className="w-full bg-purple-700 text-white mt-8 py-2 rounded-lg hover:bg-purple-800 transition">
            Select Plan
          </button>
        </div>

      </div>
    </div>
      

      {/* Notification Panel */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Live Threat Monitor</h4>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-sm flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              New security threat detected in your area
            </div>
          </div>
        </div>
      )}
    </div>

        {/* Meet Our Team Section */}
        <animated.section style={fadeIn} className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Meet Our Team</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Our team is dedicated to protecting your digital environment. Get to know the experts behind our comprehensive cybersecurity solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Lead Security Analyst",
                description: "Alex specializes in threat detection and incident response.",
                image: "/images/alex.jpg" // Replace with the actual image path
              },
              {
                name: "Sara Lee",
                role: "Cybersecurity Consultant",
                description: "Sara offers deep insights into security strategy and compliance.",
                image: "/images/sara.jpeg" // Replace with the actual image path
              },
              {
                name: "Chris Evans",
                role: "Training Specialist",
                description: "Chris leads our educational programs, helping clients protect their data.",
                image: "/images/chris.jpg" // Replace with the actual image path
              }
            ].map((teamMember, index) => (
              <animated.div
                key={index}
                style={{ ...slideUp, delay: index * 100 }}
                className="bg-white shadow-md p-6 rounded-lg hover:-translate-y-1 transition-transform"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={teamMember.image}
                    alt={teamMember.name}
                    className="w-24 h-24 rounded-full object-cover" // Adjust size as needed
                  />
                </div>
                <h3 className="text-xl font-semibold">{teamMember.name}</h3>
                <p className="text-sm text-purple-600 mb-2">{teamMember.role}</p>
                <p className="text-gray-600">{teamMember.description}</p>
              </animated.div>
            ))}
          </div>
        </animated.section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

   

        {/* User Reviews Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Latest Reviews</h2>
          <div className="bg-white shadow-md p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">What Our Users Say</h3>
            
            {/* Featured Review */}
            {reviews.length > 0 && (
              <div className="mb-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold">{reviews[0].name}</h4>
                  <p className="text-gray-600">{reviews[0].reviewText}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">{"★".repeat(reviews[0].rating)}</span>
                    <span className="text-gray-300">{"★".repeat(5 - reviews[0].rating)}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={toggleShowMore}
              className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors mb-4"
            >
              {showMore ? "Show Less" : "View More Reviews"}
            </button>

            {/* Additional Reviews */}
            {showMore && (
              <div className="space-y-4 mt-4">
                {reviews.slice(1).map((review, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">{review.name}</h4>
                    <p className="text-gray-600">{review.reviewText}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-400">{"★".repeat(review.rating)}</span>
                      <span className="text-gray-300">{"★".repeat(5 - review.rating)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
  <section id="recognition" class="bg-white shadow-md py-8">
    <div class="container mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Recognition</h2>
        <p class="text-gray-600 mb-6">We are proud to have received the following awards and recognitions:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-4 border rounded-md shadow-lg bg-gray-50">
                <img src="/images/best.jpeg" alt="Award 1" class="w-full h-24 object-contain mb-2"/>
                <h3 class="font-semibold">Best Innovation Award</h3>
                <p class="text-gray-500">Awarded for outstanding innovation in cybersecurity.</p>
            </div>
            <div class="p-4 border rounded-md shadow-lg bg-gray-50">
                <img src="/images/certi.jpeg" alt="Award 2" class="w-full h-24 object-contain mb-2"/>
                <h3 class="font-semibold">Excellence in Service</h3>
                <p class="text-gray-500">Recognized for exceptional service to our clients.</p>
            </div>
            <div class="p-4 border rounded-md shadow-lg bg-gray-50">
                <img src="images/cyber1.jpeg" alt="Award 3" class="w-full h-24 object-contain mb-2"/>
                <h3 class="font-semibold">Community Leader Award</h3>
                <p class="text-gray-500">Honored for contributions to community safety.</p>
            </div>
        </div>
     </div>
</section>


        {/* Newsletter Section */}
        <section className="mb-16 bg-purple-50">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Newsletter Content */}
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold text-purple-900 mb-4">Stay Updated</h2>
                <p className="text-xl text-gray-700 mb-6">
                  Get the latest cybersecurity insights, tips, and updates delivered straight to your inbox.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-purple-600 mr-2">✓</span>
                    Weekly security tips
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-600 mr-2">✓</span>
                    Industry news and trends
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-600 mr-2">✓</span>
                    Expert insights
                  </li>
                </ul>
              </div>
              

              {/* Newsletter Form */}
              <div className="md:w-1/2 w-full">
                <div className="bg-white shadow-lg rounded-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                  <form onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-purple-600 rounded-lg mb-4"
                      placeholder="Enter your email address"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  {subscribeMessage && (
                    <Alert className="mt-4">{subscribeMessage}</Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
  
      </div>
      <Footer />
    </div>
  );
}
