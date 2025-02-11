import React from 'react';
import { Play, ChevronRight } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">FPL</div>
          <div className="flex items-center space-x-8">
            <a href="#about" className="hover:text-primary">About Us</a>
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#project" className="hover:text-primary">Project</a>
            <a href="#faq" className="hover:text-primary">FAQ</a>
            <button className="primary-button">Sign Up</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6">
              Push Your <span className="text-primary">Limits</span> with Us
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              From beginners to advanced powerlifters, everyone
              finds their perfect fit here. Join our fitness community
              and achieve your goals.
            </p>
            <div className="flex items-center space-x-6">
              <button className="primary-button">Join Now</button>
              <button className="flex items-center space-x-2 text-white hover:text-primary transition-colors">
                <Play className="w-6 h-6" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12">
            YOUR <span className="text-primary">FITNESS</span> JOURNEY STARTS HERE
          </h2>
          <div className="grid grid-cols-4 gap-8">
            <div className="stat-card">
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-gray-400">Years of Excellence</div>
            </div>
            <div className="stat-card">
              <div className="text-4xl font-bold mb-2">27K+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="stat-card">
              <div className="text-4xl font-bold mb-2">60+</div>
              <div className="text-gray-400">Expert Trainers</div>
            </div>
            <div className="stat-card">
              <div className="text-4xl font-bold mb-2">117+</div>
              <div className="text-gray-400">Fitness Programs</div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-2">
            UNLEASH YOUR POTENTIAL: <span className="text-primary">PREMIUM</span>
          </h2>
          <h3 className="text-xl text-primary mb-12">
            FITNESS SERVICES TAILORED FOR YOU
          </h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="relative rounded-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                alt="Personal Training"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 gradient-overlay"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-xl font-bold mb-2">Personal Training</h4>
                <p className="text-gray-300 mb-4">One-on-one sessions with expert trainers</p>
                <button className="flex items-center space-x-2 text-primary group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Add more service cards as needed */}
          </div>
        </section>
      </main>
    </div>
  );
};