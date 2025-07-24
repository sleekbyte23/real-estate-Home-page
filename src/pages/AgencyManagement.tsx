import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { 
  Building, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Check,
  ExternalLink,
  Users,
  Home,
  Calendar,
  Phone,
  Mail,
  Globe,
  MapPin
} from 'lucide-react';
import { getAllAgencies, generateAgencyLink, Agency } from '../data/agencies';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';

const AgencyManagement: React.FC = () => {
  const { user } = useAuth();
  const [agencies] = useState<Agency[]>(getAllAgencies());
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  if (!user || user.role !== 'super_admin') {
    return <Navigate to="/" replace />;
  }

  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyAgencyLink = async (agencyId: string) => {
    const link = generateAgencyLink(agencyId);
    
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLinks(prev => ({ ...prev, [agencyId]: true }));
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [agencyId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const openAgencyLink = (agencyId: string) => {
    const link = generateAgencyLink(agencyId);
    window.open(link, '_blank');
  };

  return (
    <ProtectedRoute requiredRole="super_admin">
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Agency Management</h1>
            <p className="text-xl text-gray-600">
              Manage agency partnerships and branded experiences
            </p>
          </motion.div>

          {/* Search and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search agencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                <Plus className="w-5 h-5" />
                <span>Add Agency</span>
              </button>
            </div>
          </motion.div>

          {/* Agencies Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAgencies.map((agency, index) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Agency Header */}
                <div 
                  className="h-24 relative"
                  style={{ backgroundColor: `${agency.color}20` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyAgencyLink(agency.id)}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                      title="Copy agency link"
                    >
                      {copiedLinks[agency.id] ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openAgencyLink(agency.id)}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                      title="Open agency page"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>
                </div>

                {/* Agency Logo */}
                <div className="relative -mt-8 px-6">
                  <img
                    src={agency.logo}
                    alt={`${agency.name} Logo`}
                    className="w-16 h-16 rounded-xl object-cover shadow-lg border-4 border-white"
                  />
                </div>

                {/* Agency Info */}
                <div className="p-6 pt-4">
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: agency.color }}
                  >
                    {agency.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {agency.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-2" style={{ backgroundColor: `${agency.color}20` }}>
                        <Users className="w-5 h-5" style={{ color: agency.color }} />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{agency.agentCount}</div>
                      <div className="text-xs text-gray-500">Agents</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-2" style={{ backgroundColor: `${agency.color}20` }}>
                        <Home className="w-5 h-5" style={{ color: agency.color }} />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{agency.propertiesCount}</div>
                      <div className="text-xs text-gray-500">Properties</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-2" style={{ backgroundColor: `${agency.color}20` }}>
                        <Calendar className="w-5 h-5" style={{ color: agency.color }} />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{agency.established}</div>
                      <div className="text-xs text-gray-500">Est.</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" style={{ color: agency.color }} />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" style={{ color: agency.color }} />
                      <span className="truncate">{agency.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" style={{ color: agency.color }} />
                      <span className="truncate">{agency.website}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {agency.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: agency.color }}
                        >
                          {specialty}
                        </span>
                      ))}
                      {agency.specialties.length > 2 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                          +{agency.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedAgency(agency)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                      style={{ backgroundColor: agency.color }}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredAgencies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Agencies Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AgencyManagement;