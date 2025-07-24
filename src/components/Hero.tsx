import React from 'react';
import { Play, TrendingUp, Home } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-float-delayed"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Easy Way To Find Your{' '}
                <span className="text-teal-600">Dream House.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt 
                Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam.
              </p>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <span className="text-lg font-semibold text-gray-900">$17.6M</span>
                <span className="text-gray-600">Owned From Properties Transaction</span>
              </div>
              <div className="flex items-center space-x-3">
                <Home className="w-6 h-6 text-orange-500" />
                <span className="text-lg font-semibold text-gray-900">25K+</span>
                <span className="text-gray-600">Properties For Buy and Sale</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <div className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </span>
              </button>
              <button className="group flex items-center space-x-3 text-gray-700 hover:text-teal-600 font-semibold transition-all duration-300">
                <div className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Content - House Image */}
          <div className="relative animate-slide-up-delayed">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dream House"
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Available Now</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-float-delayed">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">$850K</div>
                  <div className="text-sm text-gray-500">Starting Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 overflow-hidden">
        <div className="flex animate-scroll-banner whitespace-nowrap">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="mx-8 text-lg font-semibold">
              🏠 Real Estate
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;