import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car,
  Wifi,
  Shield,
  Thermometer,
  Trees,
  Dumbbell,
  Phone,
  Mail,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { mockProperties } from '../data/mockData';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/properties')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Wifi, label: 'High-Speed Internet' },
    { icon: Shield, label: 'Security System' },
    { icon: Thermometer, label: 'Central AC/Heating' },
    { icon: Trees, label: 'Garden/Landscaping' },
    { icon: Dumbbell, label: 'Fitness Center' },
    { icon: Car, label: 'Parking Available' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </button>
      </div>

      {/* Image Gallery */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="w-12 h-12 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Play className="w-6 h-6" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                property.status === 'for-sale' 
                  ? 'bg-green-500 text-white' 
                  : property.status === 'for-rent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}>
                {property.status === 'for-sale' ? 'For Sale' : 
                 property.status === 'for-rent' ? 'For Rent' : 'Sold'}
              </span>
            </div>

            {/* Image Indicators */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-5 h-5" />
                    <span>{property.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="w-5 h-5" />
                    <span>{property.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="w-5 h-5" />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-teal-600">
                  {formatPrice(property.price)}
                  {property.status === 'for-rent' && <span className="text-lg text-gray-500 ml-2">/month</span>}
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {['overview', 'features', 'location'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? 'border-teal-500 text-teal-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {property.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Features</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-teal-600" />
                          </div>
                          <span className="font-medium text-gray-900">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Location & Neighborhood</h3>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Address</h4>
                        <p className="text-gray-600">{property.address}</p>
                      </div>
                      
                      <div className="h-64 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                          <p className="text-gray-700 font-medium">Interactive Map</p>
                          <p className="text-gray-500 text-sm">View neighborhood details</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{property.agent.name}</h4>
                    <div className="flex items-center space-x-1 mb-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(property.agent.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({property.agent.rating})</span>
                    </div>
                    <p className="text-sm text-gray-500">{property.agent.properties} Properties</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                    Contact Agent
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200">
                    Schedule Tour
                  </button>
                </div>
              </motion.div>

              {/* Property Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium text-gray-900 capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium text-gray-900">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lot Size</span>
                    <span className="font-medium text-gray-900">0.25 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed Date</span>
                    <span className="font-medium text-gray-900">{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Mortgage Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4">Mortgage Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount</label>
                    <input
                      type="text"
                      value={formatPrice(property.price * 0.8)}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70"
                      readOnly
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">$3,200</div>
                    <div className="text-sm opacity-90">Estimated Monthly Payment</div>
                  </div>
                  <button className="w-full bg-white text-teal-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    Get Pre-Approved
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailsPage;