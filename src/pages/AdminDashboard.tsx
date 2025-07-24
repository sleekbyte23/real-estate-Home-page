import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Home, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Building,
  MapPin,
  Calendar,
  Star,
  Phone,
  Mail,
  Award,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  LogOut,
  Globe,
  FileText
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAgencyBranding } from '../hooks/useAgencyBranding';
import ProtectedRoute from '../components/ProtectedRoute';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  agent: string;
  dateAdded: string;
  agencyId: string;
}

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  properties: number;
  image: string;
  agencyId: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentAgency } = useAgencyBranding();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API
  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern Villa',
      price: 850000,
      location: 'Beverly Hills, CA',
      type: 'Villa',
      status: 'For Sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      agent: 'John Smith',
      dateAdded: '2024-01-15',
      agencyId: user?.role === 'super_admin' ? 'abc_realty' : user?.agencyId || ''
    },
    {
      id: '2',
      title: 'Downtown Apartment',
      price: 450000,
      location: 'Manhattan, NY',
      type: 'Apartment',
      status: 'For Rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      agent: 'Sarah Johnson',
      dateAdded: '2024-01-10',
      agencyId: user?.role === 'super_admin' ? 'xyz_properties' : user?.agencyId || ''
    }
  ];

  const agents: Agent[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Luxury Homes',
      rating: 4.8,
      properties: 15,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      agencyId: user?.role === 'super_admin' ? 'abc_realty' : user?.agencyId || ''
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      specialization: 'Commercial Properties',
      rating: 4.9,
      properties: 22,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      agencyId: user?.role === 'super_admin' ? 'xyz_properties' : user?.agencyId || ''
    }
  ];

  // Filter data based on user role
  const filteredProperties = user?.role === 'super_admin' 
    ? properties 
    : properties.filter(p => p.agencyId === user?.agencyId);

  const filteredAgents = user?.role === 'super_admin' 
    ? agents 
    : agents.filter(a => a.agencyId === user?.agencyId);

  const stats = {
    totalProperties: filteredProperties.length,
    totalAgents: filteredAgents.length,
    totalRevenue: filteredProperties.reduce((sum, p) => sum + p.price, 0),
    activeListings: filteredProperties.filter(p => p.status === 'For Sale').length
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Agents</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAgents}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeListings}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {filteredProperties.slice(0, 3).map((property, index) => (
            <div key={property.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={property.image}
                alt={property.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{property.title}</p>
                <p className="text-sm text-gray-600">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${property.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{property.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Properties Management</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${property.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'For Sale' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.agent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.dateAdded}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-teal-600 hover:text-teal-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Agents Management</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Agent</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.specialization}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {agent.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {agent.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                {agent.rating} Rating
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building className="w-4 h-4 mr-2" />
                {agent.properties} Properties
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                View Profile
              </button>
              <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Users Management</h3>
        <p className="text-gray-600">User management functionality will be implemented here.</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'agents', label: 'Agents', icon: Users },
    ...(user?.role === 'super_admin' ? [{ id: 'users', label: 'Users', icon: Settings }] : []),
    ...(user?.role === 'agency_admin' ? [
      { id: 'company', label: 'Company Info', icon: Building },
      { id: 'contact', label: 'Contact Page', icon: Mail }
    ] : [])
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderCompanyManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Company Information Management</h2>
      
      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Stats</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Properties Sold</label>
            <input
              type="text"
              defaultValue="500+"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Happy Clients</label>
            <input
              type="text"
              defaultValue="1000+"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
            <input
              type="text"
              defaultValue="15+"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Sales</label>
            <input
              type="text"
              defaultValue="$50M+"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Story</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Story</label>
            <textarea
              rows={6}
              defaultValue="Founded in 2008, our real estate company began with a simple mission: to provide exceptional service and expertise to help people navigate one of life's most important decisions."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Image URL</label>
            <input
              type="url"
              defaultValue="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Values</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Trust & Integrity', description: 'We build lasting relationships through honest, transparent dealings and ethical business practices.' },
            { title: 'Client-Focused', description: 'Your goals are our priority. We tailor our services to meet your unique real estate needs.' },
            { title: 'Excellence', description: 'We strive for excellence in every transaction, delivering exceptional results and service.' },
            { title: 'Reliability', description: 'Count on us to be there when you need us, providing consistent and dependable service.' }
          ].map((value, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                defaultValue={value.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-medium"
              />
              <textarea
                rows={3}
                defaultValue={value.description}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Meet Our Team</h3>
        <div className="space-y-6">
          {[
            { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
            { name: 'Michael Chen', role: 'Senior Agent', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
            { name: 'Emily Rodriguez', role: 'Commercial Specialist', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }
          ].map((member, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={member.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={member.role}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  defaultValue={member.image}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContactManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Page Management</h2>
      
      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="info@realestate.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
            <input
              type="text"
              defaultValue="123 Main Street, City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              defaultValue="www.realestate.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
        <div className="space-y-4">
          {[
            { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
            { day: 'Sunday', hours: 'Closed' }
          ].map((schedule, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                defaultValue={schedule.day}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="text"
                defaultValue={schedule.hours}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 999-0000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Email</label>
            <input
              type="email"
              defaultValue="urgent@realestate.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <ProtectedRoute requiredRole="agency_admin">
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {user?.role === 'super_admin' ? 'Super Admin Dashboard' : `${currentAgency.name} Dashboard`}
              </h1>
              <p className="text-xl text-gray-600">
                Welcome back, {user?.name}! {user?.role === 'super_admin' ? 'Manage the entire platform.' : `Manage your agency's properties and content.`}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'properties' && renderProperties()}
            {activeTab === 'agents' && renderAgents()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'company' && renderCompanyManagement()}
            {activeTab === 'contact' && renderContactManagement()}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;