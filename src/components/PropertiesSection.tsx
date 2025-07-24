import React, { useState } from 'react';
import { Heart, Share2, MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';

const PropertiesSection: React.FC = () => {
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);

  const properties = [
    {
      id: 1,
      title: "Kalidy Residence",
      location: "California, Sumatera Utar",
      price: "$6,900",
      beds: 4,
      baths: 3,
      area: "750 sq ft",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      isLiked: false,
    },
    {
      id: 2,
      title: "Kalidy Residence", 
      location: "California, Sumatera Utar",
      price: "$6,900",
      beds: 4,
      baths: 3,
      area: "750 sq ft",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      isLiked: true,
    },
    {
      id: 3,
      title: "Kalidy Residence",
      location: "California, Sumatera Utar", 
      price: "$6,900",
      beds: 4,
      baths: 3,
      area: "750 sq ft",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
      isLiked: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 animate-fade-up">
          <div>
            <p className="text-orange-500 font-semibold mb-2">🏠 LATEST LISTINGS</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Featured Property For Sale
            </h2>
          </div>
          <button className="mt-6 lg:mt-0 group bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
            <span>View All Property</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProperty(property.id)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    property.isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                  }`}>
                    <Heart className={`w-5 h-5 ${property.isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    For Sale
                  </span>
                </div>

                {/* Hover Overlay Content */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  hoveredProperty === property.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0">
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center space-x-2 text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors duration-200">
                  {property.title}
                </h3>

                {/* Features */}
                <div className="flex items-center justify-between text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{property.beds} Bed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span className="text-sm">{property.baths} Bath</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span className="text-sm">{property.area}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{property.price}</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;