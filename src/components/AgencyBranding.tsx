import React from 'react';
import { motion } from 'framer-motion';
import { useAgencyBranding } from '../hooks/useAgencyBranding';
import { Building, Phone, Mail, Globe, MapPin, Calendar, Users, Home } from 'lucide-react';

const AgencyBranding: React.FC = () => {
  const { currentAgency, isCustomAgency } = useAgencyBranding();

  if (!isCustomAgency) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          {/* Agency Info */}
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img
                src={currentAgency.logo}
                alt={`${currentAgency.name} Logo`}
                className="w-16 h-16 rounded-xl object-cover shadow-lg"
              />
              <div 
                className="absolute inset-0 rounded-xl opacity-20"
                style={{ backgroundColor: currentAgency.color }}
              ></div>
            </motion.div>
            
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-bold text-gray-900"
                style={{ color: currentAgency.color }}
              >
                {currentAgency.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 max-w-md"
              >
                {currentAgency.description}
              </motion.p>
            </div>
          </div>

          {/* Agency Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-2" style={{ backgroundColor: `${currentAgency.color}20` }}>
                <Users className="w-6 h-6" style={{ color: currentAgency.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{currentAgency.agentCount}</div>
              <div className="text-sm text-gray-500">Agents</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-2" style={{ backgroundColor: `${currentAgency.color}20` }}>
                <Home className="w-6 h-6" style={{ color: currentAgency.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{currentAgency.propertiesCount}</div>
              <div className="text-sm text-gray-500">Properties</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-2" style={{ backgroundColor: `${currentAgency.color}20` }}>
                <Calendar className="w-6 h-6" style={{ color: currentAgency.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{currentAgency.established}</div>
              <div className="text-sm text-gray-500">Established</div>
            </div>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" style={{ color: currentAgency.color }} />
              <span>{currentAgency.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" style={{ color: currentAgency.color }} />
              <span>{currentAgency.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" style={{ color: currentAgency.color }} />
              <span>{currentAgency.website}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" style={{ color: currentAgency.color }} />
              <span>{currentAgency.address}</span>
            </div>
          </div>
        </motion.div>

        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4"
        >
          <div className="flex flex-wrap gap-2">
            {currentAgency.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: currentAgency.color }}
              >
                {specialty}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgencyBranding;