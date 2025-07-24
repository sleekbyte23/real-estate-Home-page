import React from 'react';
import { Home, Key, TrendingUp } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Home,
      title: "Buy a Home",
      description: "Duis Aute Irure Dolor In Reprehenderit Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur.",
      bgColor: "bg-orange-500",
      isHighlighted: false,
    },
    {
      icon: Key,
      title: "Buy a Home",
      description: "Duis Aute Irure Dolor In Reprehenderit Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur.",
      bgColor: "bg-gray-800",
      isHighlighted: true,
    },
    {
      icon: TrendingUp,
      title: "Buy a Home",
      description: "Duis Aute Irure Dolor In Reprehenderit Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur.",
      bgColor: "bg-orange-500",
      isHighlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-orange-500 font-semibold mb-2">🏠 SERVICES</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our Best Real Estate Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer animate-slide-up ${
                service.isHighlighted 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-50 hover:bg-white border-2 border-transparent hover:border-teal-100'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-4 ${
                service.isHighlighted ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>
              
              <p className={`leading-relaxed ${
                service.isHighlighted ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {service.description}
              </p>

              {/* Hover Effect Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className={`w-10 h-10 ${service.bgColor} rounded-full flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden rounded-2xl">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;