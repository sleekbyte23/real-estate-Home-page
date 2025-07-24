import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative animate-slide-left">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern House"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">25+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-8 -left-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-teal-200 rounded-full opacity-60"></div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 animate-slide-right">
            <div>
              <p className="text-orange-500 font-semibold mb-2">🏠 OUR SERVICES</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Helping People To Find The Right Property
              </h2>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod 
                Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, 
                Quis Nostrud Exercitation Ullamco.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Home Design</h3>
                  <p className="text-gray-600">
                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. 
                    Sed Do Eiusmod Tempor Incididunt.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Engineer</h3>
                  <p className="text-gray-600">
                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. 
                    Sed Do Eiusmod Tempor Incididunt.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
              <span>Discover More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;