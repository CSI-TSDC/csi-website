"use client"

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram, Github } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    message: '',
    newsletter: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const recipient = 'csi@tsdcmumbai.in';
    const subject = encodeURIComponent(formData.name ? `Contact from ${formData.name}` : 'Contact Form Submission');
    
    // Build email body with form data
    let body = '';
    if (formData.name) body += `Name: ${formData.name}\n`;
    if (formData.email) body += `Email: ${formData.email}\n`;
    if (formData.phone) body += `Phone: ${formData.phone}\n`;
    if (formData.message) body += `\nMessage:\n${formData.message}`;
    
    const bodyEncoded = encodeURIComponent(body);
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${bodyEncoded}`;
    
    // Open mail client
    window.location.href = mailtoLink;
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="min-h-screen bg-csi-white  font-dm-sans-medium">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 pt-24 pb-10 md:py-32 lg:pt-40 relative overflow-hidden">
        <div className="absolute top-26 hidden md:block left-20 opacity-15">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-sky-400 rotate-45"></div>
            ))}
          </div>
        </div>
        <div className="absolute hidden md:block bottom-10 right-20 opacity-15">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-indigo-400 rotate-45"></div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center font-bespoke-sans-semibold">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 md:mb-12">Contact Us</h1>
          <p className="text-csi-black text-sm sm:text-base text-left md:text-lg max-w-2xl mx-auto font-dm-sans-medium px-2">
            For any query, fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-csi-white rounded-2xl shadow-lg p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-5 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="px-5 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-5 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <textarea
                    placeholder="Message"
                    rows="6"
                    className="w-full px-5 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-xl text-slate-700 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-gradient-to-r w-full md:w-max from-csi-blue-400 to-csi-blue-600 hover:from-csi-blue-600 hover:to-csi-blue-700 text-white rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Event & Sponsorship Enquiries */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl h-full">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Event & Sponsorship Enquiries</h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                  We conduct events, hackathons, workshops.
                </p>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-slate-300 text-xs mb-1">Event Enquiries</p>
                      <a 
                        href="mailto:events@csi-tsdc.com" 
                        className="text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
                      >
                        events@csi-tsdc.com
                      </a>
                    </div>
                    <div>
                      <p className="text-slate-300 text-xs mb-1">Sponsorship</p>
                      <a 
                        href="mailto:sponsorship@csi-tsdc.com" 
                        className="text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
                      >
                        sponsorship@csi-tsdc.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // Handle download sponsorship slab
                    }}
                    className="w-full py-3 bg-gradient-to-r from-csi-blue leading-snug  to-csi-blue-600 hover:from-csi-blue-600 hover:to-csi-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Sponsorship Slab will be available here soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-12 sm:py-16 md:py-20 bg-csi-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-csi-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                <Instagram className="text-pink-600 w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                <a href="https://www.instagram.com/csixtsdc/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                  @csixtsdc
                </a>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Follow us for updates, events, and announcements.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-csi-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                <Github className="text-slate-900 w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                <a href="https://github.com/CSI-TSDC" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
                  CSI-TSDC
                </a>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Check out our projects and contributions on GitHub.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-csi-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                <Mail className="text-slate-700 w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                <a href="mailto:csi@tsdcmumbai.in" className="hover:text-slate-700 transition-colors">
                  csi@tsdcmumbai.in
                </a>
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Send us an email and we'll get back to you soon.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-csi-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                <MapPin className="text-indigo-600 w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Address</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Thakur Shyamnarayan Degree College, 90 Feet Rd, Kandivali, Thakur Complex, Kandivali East, Mumbai, Maharashtra 400101
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl" style={{height: '300px'}}>
            <div className="w-full h-full flex items-center justify-center text-slate-600 bg-gradient-to-br from-slate-100 to-slate-200">
            <iframe className="w-full h-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.577703117732!2d72.8623017756852!3d19.213638547636258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b731d4f3be13%3A0x6ac73cbebb4dc1de!2sThakur%20Shyamnarayan%20Degree%20College!5e0!3m2!1sen!2sin!4v1767002328085!5m2!1sen!2sin"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}