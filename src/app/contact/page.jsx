"use client"

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

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
    console.log('Form submitted:', formData);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter submitted:', formData.newsletter);
  };

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-24 relative overflow-hidden">
        <div className="absolute top-10 left-20 opacity-15">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-sky-400 rotate-45"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-20 opacity-15">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-indigo-400 rotate-45"></div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <svg width="300" height="60" viewBox="0 0 300 60">
            <path d="M0 30 Q 75 5, 150 30 T 300 30" stroke="#0ea5e9" fill="none" strokeWidth="2"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold text-slate-900 mb-6">Contact Us</h1>
          <div className="flex justify-center mb-6">
            <svg width="120" height="24" viewBox="0 0 120 24">
              <path d="M0 12 Q 30 2, 60 12 T 120 12" stroke="#0ea5e9" fill="none" strokeWidth="2.5"/>
            </svg>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="space-y-5">
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
                    onClick={handleSubmit}
                    className="px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Submit Button
                  </button>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl h-full">
                <h3 className="text-2xl font-bold mb-4">Our Newsletters</h3>
                <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/95 text-slate-800 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                    value={formData.newsletter}
                    onChange={(e) => setFormData({...formData, newsletter: e.target.value})}
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Submit Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-md">
                <Phone className="text-sky-600" size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">(+976) 786 665</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et tellus, luctus nec.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-md">
                <Mail className="text-slate-700" size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">mail@influenca.id</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et tellus, luctus nec.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-md">
                <MapPin className="text-indigo-600" size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">London Eye London</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et tellus, luctus nec.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl overflow-hidden shadow-xl" style={{height: '450px'}}>
            <div className="w-full h-full flex items-center justify-center text-slate-600 bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin size={40} className="text-sky-600" />
                </div>
                <p className="text-lg font-semibold text-slate-800 mb-1">Interactive Map Would Be Here</p>
                <p className="text-sm text-slate-600">London Eye, London</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}