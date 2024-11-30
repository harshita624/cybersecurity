import React from 'react';
import LearnMoreNavbar from '../components/LearnMoreNavbar';
import LearnMoreFooter from '../components/LearnMoreFooter';

export default function LearnMore() {
  return (
    <>
      <LearnMoreNavbar />
      <div className="bg-white py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 sm:text-6xl">
            Learn More About Our Cybersecurity Solutions
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Protect your organization from the increasing digital threats. Our cybersecurity solutions are designed to safeguard your business, your data, and your reputation.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {/* Incident Reporting Section */}
          <div className="bg-white p-10 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-semibold text-gray-800">Incident Reporting</h3>
            <p className="mt-4 text-gray-600">
              Easily report security incidents with our user-friendly platform and get fast responses.
            </p>
          </div>

          {/* Security Assessments Section */}
          <div className="bg-white p-10 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-semibold text-gray-800">Security Assessments</h3>
            <p className="mt-4 text-gray-600">
              Identify vulnerabilities and secure your systems with our in-depth security assessments.
            </p>
          </div>

          {/* Cybersecurity Training Section */}
          <div className="bg-white p-10 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-semibold text-gray-800">Cybersecurity Training</h3>
            <p className="mt-4 text-gray-600">
              Equip your team with the latest knowledge and tools to protect against cyber threats.
            </p>
          </div>
        </div>

        {/* Why Cybersecurity Matters Section */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">Why Cybersecurity Matters</h2>
          <p className="mt-6 text-xl text-gray-600">
            Cybersecurity is not just about protecting data; it's about maintaining trust, ensuring business continuity, and preventing financial loss.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mt-24 text-center bg-gray-50 py-16 rounded-lg shadow-lg">
          <h3 className="text-4xl font-extrabold text-gray-800">Cybersecurity by the Numbers</h3>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Statistic 1 */}
            <div className="text-center">
              <h4 className="text-4xl font-semibold text-gray-800">$10 Trillion</h4>
              <p className="mt-2 text-gray-600">Global cybercrime damages expected in 2025.</p>
            </div>
            {/* Statistic 2 */}
            <div className="text-center">
              <h4 className="text-4xl font-semibold text-gray-800">60%</h4>
              <p className="mt-2 text-gray-600">Percentage of small businesses that close after a cyberattack.</p>
            </div>
            {/* Statistic 3 */}
            <div className="text-center">
              <h4 className="text-4xl font-semibold text-gray-800">50%</h4>
              <p className="mt-2 text-gray-600">Percentage of data breaches caused by human error.</p>
            </div>
          </div>
        </div>

        {/* How We Can Help Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-semibold text-gray-800">How We Can Help</h3>
          <p className="mt-6 text-xl text-gray-600">
            Our tailored solutions help businesses of all sizes protect their digital assets, with customized security strategies that fit your needs.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="mt-24 text-center">
          <h4 className="text-2xl font-semibold text-gray-800">Ready to Protect Your Organization?</h4>
          <div className="mt-6 space-x-4">
            <a href="#" className="inline-block px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300">
              Get Started
            </a>
            <a href="#" className="inline-block px-8 py-4 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300">
              Request a Consultation
            </a>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-semibold text-gray-800">What Our Clients Say</h3>
          <div className="mt-12 space-y-6">
            <p className="text-xl text-gray-600">
              "The cybersecurity solutions provided have helped us mitigate threats and secure our sensitive data."
              <span className="block mt-4 text-lg font-semibold text-gray-800">- John Doe, CTO at TechSolutions</span>
            </p>
            <p className="text-xl text-gray-600">
              "Their training program was comprehensive and allowed our team to handle security threats confidently."
              <span className="block mt-4 text-lg font-semibold text-gray-800">- Jane Smith, IT Manager at SecureTech</span>
            </p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Contact Us</h3>
          <div className="mt-6 space-x-4">
            <a href="mailto:contact@cybersecurity.com" className="inline-block px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300">
              Email Us
            </a>
            <a href="tel:+123456789" className="inline-block px-8 py-4 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300">
              Call Us
            </a>
          </div>
        </div>
      </div>
      <LearnMoreFooter />
    </>
  );
}
