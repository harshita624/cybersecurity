
"use client";

import React from "react";
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { useSpring, animated } from "@react-spring/web";

const blogPosts = [
  {
    title: 'Cybersecurity Trends 2024',
    date: 'October 11, 2024',
    slug: 'cybersecurity-trends-2024',
    content: 'Explore the top cybersecurity trends for 2024, including AI-driven defenses, zero-trust architecture, and quantum encryption.'
  },
  {
    title: '5 Tips for Protecting Your Personal Data',
    date: 'October 5, 2024',
    slug: 'protecting-personal-data',
    content: 'Learn how to keep your personal data safe with these 5 essential cybersecurity tips, including using strong passwords and enabling 2FA.'
  },
  {
    title: 'How to Prevent Phishing Attacks',
    date: 'September 28, 2024',
    slug: 'prevent-phishing-attacks',
    content: 'Phishing attacks are on the rise. Discover how you can spot phishing attempts and protect yourself from becoming a victim.'
  },
  {
    title: 'The Importance of Multi-Factor Authentication',
    date: 'September 20, 2024',
    slug: 'importance-of-mfa',
    content: "Multi-factor authentication (MFA) is one of the simplest and most effective ways to secure your accounts. Here's why you should enable it today."
  },
  {
    title: 'Understanding Ransomware',
    date: 'September 10, 2024',
    slug: 'understanding-ransomware',
    content: 'Ransomware attacks are becoming more sophisticated. Learn about how they work and how you can protect your data from ransomware threats.'
  },
  {
    title: 'Cybersecurity in the Cloud: What You Need to Know',
    date: 'August 30, 2024',
    slug: 'cybersecurity-in-the-cloud',
    content: 'With the rise of cloud computing, cybersecurity has taken on a new level of importance. Find out how to secure your cloud environment.'
  }
];

export default function Blog() {
  const heroAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  return (
    <>
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
        <animated.section style={heroAnimation} className="text-center py-16">
          <BookOpen className="mx-auto w-16 h-16 text-[#00F5D4] mb-6" />
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF] mb-6">
            CyberShield Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Stay informed with the latest cybersecurity insights, trends, and protection strategies.
          </p>
        </animated.section>

        {/* Blog Posts */}
        <section className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 hover:border-[#00F5D4] transition-all"
            >
              <div className="flex items-center text-gray-400 mb-4">
                <Calendar className="mr-2 w-5 h-5 text-[#00F5D4]" />
                <span className="text-sm">{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold text-[#00F5D4] mb-4">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-6">
                {post.content.substring(0, 120)}...
              </p>
              <a 
                href={`/blog/${post.slug}`} 
                className="flex items-center text-[#00F5D4] hover:text-opacity-80"
              >
                Read More
                <ChevronRight className="ml-2" />
              </a>
            </div>
          ))}
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
    </>
  )
}
