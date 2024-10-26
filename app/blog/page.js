
"use client"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Import the Footer component
import Link from 'next/link';
import React from 'react';

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
    content: 'Multi-factor authentication (MFA) is one of the simplest and most effective ways to secure your accounts. Here’s why you should enable it today.'
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
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Stay up to date with the latest news and tips in cybersecurity.
        </p>

        {/* Blog posts in grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-2 cursor-pointer hover:underline">{post.title}</h2>
              </Link>
              <p className="text-xs text-gray-500 mb-4">{post.date}</p>
              <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
              <Link href={`/blog/${post.slug}`}>
                <span className="text-blue-500 hover:underline cursor-pointer">Read more →</span>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}
