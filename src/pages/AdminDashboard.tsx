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
  FileText,
  Menu,
  X,
  Bed,
  Bath,
  Square,
  Save,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAgencyBranding } from '../hooks/useAgencyBranding';
import ProtectedRoute from '../components/ProtectedRoute';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images: string[];
  agent: string;
  dateAdded: string;
  agencyId: string;
  description: string;
  features: string[];
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentAgency } = useAgencyBranding();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    price: '',
    location: '',
    address: '',
    type: 'house',
    status: 'for-sale',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    description: '',
    features: '',
    images: ['']
  });

  // Mock data - in real app, this would come from API
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Villa',
      price: 850000,
      location: 'Beverly Hills, CA',
      address: '123 Beverly Hills Dr, Beverly Hills, CA 90210',
      type: 'Villa',
      status: 'For Sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      agent: 'John Smith',
      dateAdded: '2024-01-15',
      agencyId: user?.role === 'super_admin' ? 'abc_realty' : user?.agencyId || '',
      description: 'Beautiful modern villa with stunning views and luxury amenities.',
      features: ['Swimming Pool', 'Garage', 'Garden', 'Smart Home']
    },
    {
      id: '2',
      title: 'Downtown Apartment',
      price: 450000,
      location: 'Manhattan, NY',
      address: '456 Manhattan Ave, New York, NY 10001',
      type: 'Apartment',
      status: 'For Rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
      agent: 'Sarah Johnson',
      dateAdded: '2024-01-10',
      agencyId: user?.role === 'super_admin' ? 'xyz_properties' : user?.agencyId || '',
      description: 'Modern apartment in the heart of downtown with city views.',
      features: ['City View', 'Balcony', 'Gym Access', 'Concierge']
    }
  ]);

  // Filter data based on user role
  const filteredProperties = user?.role === 'super_admin' 
    ? properties 
    : properties.filter(p => p.agencyId === user?.agencyId);

  const stats = {
    totalProperties: filteredProperties.length,
    totalRevenue: filteredProperties.reduce((sum, p) => sum + p.price, 0),
    activeListings: filteredProperties.filter(p => p.status === 'For Sale').length,
    soldProperties: filteredProperties.filter(p => p.status === 'Sold').length
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty: Property = {
      id: editingProperty?.id || Date.now().toString(),
      title: propertyForm.title,
      price: parseInt(propertyForm.price),
      location: propertyForm.location,
      address: propertyForm.address,
      type: propertyForm.type,
      status: propertyForm.status,
      bedrooms: propertyForm.bedrooms,
      bathrooms: propertyForm.bathrooms,
      area: parseInt(propertyForm.area),
      image: propertyForm.images[0],
      images: propertyForm.images.filter(img => img.trim() !== ''),
      agent: user?.name || 'Agent',
      dateAdded: editingProperty?.dateAdded || new Date().toISOString().split('T')[0],
      agencyId: user?.agencyId || 'default',
      description: propertyForm.description,
      features: propertyForm.features.split(',').map(f => f.trim()).filter(f => f !== '')
    };

    if (editingProperty) {
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? newProperty : p));
    } else {
      setProperties(prev => [...prev, newProperty]);
    }

    resetPropertyForm();
  };

  const resetPropertyForm = () => {
    setPropertyForm({
      title: '',
      price: '',
      location: '',
      address: '',
      type: 'house',
      status: 'for-sale',
      bedrooms: 1,
      bathrooms: 1,
      area: '',
      description: '',
      features: '',
      images: ['']
    });
    setEditingProperty(null);
    setShowPropertyForm(false);
  };

  const handleEditProperty = (property: Property) => {
    setPropertyForm({
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      address: property.address,
      type: property.type.toLowerCase(),
      status: property.status.toLowerCase().replace(' ', '-'),
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area.toString(),
      description: property.description,
      features: property.features.join(', '),
      images: property.images.length > 0 ? property.images : ['']
    });
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    }
  };

  const addImageField = () => {
    setPropertyForm(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setPropertyForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImageField = (index: number) => {
    setPropertyForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const renderOverview = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
            <div className="p-2 md:p-3 bg-blue-100 rounded-full">
              <Home className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{stats.activeListings}</p>
            </div>
            <div className="p-2 md:p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-2 md:p-3 bg-yellow-100 rounded-full">
              <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Sold Properties</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{stats.soldProperties}</p>
            </div>
            <div className="p-2 md:p-3 bg-purple-100 rounded-full">
              <Award className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
        <div className="space-y-3 md:space-y-4">
          {filteredProperties.slice(0, 3).map((property, index) => (
            <div key={property.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg">
              <img
                src={property.image}
                alt={property.title}
                className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{property.title}</p>
                <p className="text-sm text-gray-600 truncate">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm md:text-base">${property.price.toLocaleString()}</p>
                <p className="text-xs md:text-sm text-gray-600">{property.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Properties Management</h2>
        <button 
          onClick={() => setShowPropertyForm(true)}
          className="w-full sm:w-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Property Form Modal */}
      {showPropertyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h3>
                <button
                  onClick={resetPropertyForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handlePropertySubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                  <input
                    type="text"
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter property title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="number"
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, price: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={propertyForm.location}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, location: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                  <select
                    value={propertyForm.type}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                <input
                  type="text"
                  value={propertyForm.address}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, address: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter full address"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    min="1"
                    value={propertyForm.bedrooms}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    min="1"
                    value={propertyForm.bathrooms}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, bathrooms: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                  <input
                    type="number"
                    value={propertyForm.area}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={propertyForm.status}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Enter property description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
                <input
                  type="text"
                  value={propertyForm.features}
                  onChange={(e) => setPropertyForm(prev => ({ ...prev, features: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Swimming Pool, Garage, Garden, Smart Home"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                <div className="space-y-3">
                  {propertyForm.images.map((image, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter image URL"
                      />
                      {propertyForm.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-800"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Image</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProperty ? 'Update Property' : 'Add Property'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetPropertyForm}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Properties List */}
      <div className="space-y-4">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={property.image}
                alt={property.title}
                className="w-full md:w-32 h-32 md:h-24 rounded-lg object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm truncate">{property.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-gray-900">
                      ${property.price.toLocaleString()}
                    </span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'For Sale' 
                        ? 'bg-green-100 text-green-800' 
                        : property.status === 'For Rent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditProperty(property)}
                      className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteProperty(property.id)}
                      className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">Start by adding your first property listing.</p>
            <button 
              onClick={() => setShowPropertyForm(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Add Property
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCompanyManagement = () => (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Company Information Management</h2>
      
      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Properties Sold</label>
            <input
              type="text"
              defaultValue="500+"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Happy Clients</label>
            <input
              type="text"
              defaultValue="1000+"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
            <input
              type="text"
              defaultValue="15+"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Sales</label>
            <input
              type="text"
              defaultValue="$50M+"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Story</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Story</label>
            <textarea
              rows={6}
              defaultValue="Founded in 2008, our real estate company began with a simple mission: to provide exceptional service and expertise to help people navigate one of life's most important decisions."
              className="w-full px-3 md:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Image URL</label>
            <input
              type="url"
              defaultValue="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-medium"
              />
              <textarea
                rows={3}
                defaultValue={value.description}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Meet Our Team</h3>
        <div className="space-y-4 md:space-y-6">
          {[
            { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
            { name: 'Michael Chen', role: 'Senior Agent', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
            { name: 'Emily Rodriguez', role: 'Commercial Specialist', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }
          ].map((member, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={member.name}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={member.role}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  defaultValue={member.image}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContactManagement = () => (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Contact Page Management</h2>
      
      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="info@realestate.com"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
            <input
              type="text"
              defaultValue="123 Main Street, City"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              defaultValue="www.realestate.com"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
        <div className="space-y-4">
          {[
            { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
            { day: 'Sunday', hours: 'Closed' }
          ].map((schedule, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                defaultValue={schedule.day}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="text"
                defaultValue={schedule.hours}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 999-0000"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Email</label>
            <input
              type="email"
              defaultValue="urgent@realestate.com"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'properties', label: 'Properties', icon: Home },
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

  return (
    <ProtectedRoute requiredRole="agency_admin">
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                  {user?.role === 'super_admin' ? 'Super Admin Dashboard' : `${currentAgency.name} Dashboard`}
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
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
          </div>

          {/* Mobile Tab Menu */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
            >
              <span className="font-medium text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </span>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {isMobileMenuOpen && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 ${
                        activeTab === tab.id ? 'bg-teal-50 text-teal-600 border-r-2 border-teal-500' : 'text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:block mb-8">
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
            {activeTab === 'company' && renderCompanyManagement()}
            {activeTab === 'contact' && renderContactManagement()}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;