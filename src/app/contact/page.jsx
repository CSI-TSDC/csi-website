"use client"

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Menu, Search } from 'lucide-react';

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
    <section className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-50 to-slate-100 py-20 relative overflow-hidden">
        <div className="absolute top-10 left-20 opacity-20">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-blue-300 rotate-45"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-20 opacity-20">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-blue-300 rotate-45"></div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <svg width="200" height="50" viewBox="0 0 200 50">
            <path d="M0 25 Q 50 0, 100 25 T 200 25" stroke="#3b82f6" fill="none" strokeWidth="2"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">Contact Us</h1>
          <div className="flex justify-center mb-4">
            <svg width="100" height="20" viewBox="0 0 100 20">
              <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="#3b82f6" fill="none" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et telus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </div>

      {/* Logo Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
                <span className="font-semibold text-slate-600">logoipsum</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-300"></div>
                <span className="font-semibold text-slate-600">LOGOIPSUM</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-semibold text-slate-400">LOGO—IPSUM</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-300"></div>
                <span className="font-semibold text-slate-400">LOGOIPSUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-6 py-4 bg-blue-100 border-none rounded-lg text-slate-700 placeholder-slate-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="px-6 py-4 bg-blue-100 border-none rounded-lg text-slate-700 placeholder-slate-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-blue-100 border-none rounded-lg text-slate-700 placeholder-slate-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <textarea
                  placeholder="Message"
                  rows="6"
                  className="w-full px-6 py-4 bg-blue-100 border-none rounded-lg text-slate-700 placeholder-slate-500 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <button
                  type="submit"
                  className="px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-full font-medium transition"
                >
                  Submit Button
                </button>
              </form>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Newsletters</h3>
              <p className="text-slate-200 text-sm mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et telus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white text-slate-700 rounded-lg"
                  value={formData.newsletter}
                  onChange={(e) => setFormData({...formData, newsletter: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-lg font-medium transition"
                >
                  Submit Button
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
              <Phone className="text-slate-700 mb-4" size={32} />
              <h4 className="text-xl font-bold text-slate-800 mb-2">(+976) 786 665</h4>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et telus, luctus nec.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl p-8">
              <Mail className="text-slate-700 mb-4" size={32} />
              <h4 className="text-xl font-bold text-slate-800 mb-2">mail@influenca.id</h4>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et telus, luctus nec.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-slate-200 rounded-2xl p-8">
              <MapPin className="text-slate-700 mb-4" size={32} />
              <h4 className="text-xl font-bold text-slate-800 mb-2">London Eye London</h4>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut et telus, luctus nec.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-300 rounded-2xl overflow-hidden" style={{height: '400px'}}>
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-2" />
                <p>Interactive Map Would Be Here</p>
                <p className="text-sm">London Eye, London</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}