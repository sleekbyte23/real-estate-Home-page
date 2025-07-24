import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronDown, Copy, Check, ExternalLink } from 'lucide-react';
import { getAllAgencies, generateAgencyLink } from '../data/agencies';
import { useAgencyBranding } from '../hooks/useAgencyBranding';

const AgencySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  const { currentAgency, updateAgency } = useAgencyBranding();
  const agencies = getAllAgencies();

  const handleAgencySelect = (agencyId: string) => {
    updateAgency(agencyId);
    setIsOpen(false);
  };

  const copyAgencyLink = async (agencyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const openAgencyLink = (agencyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = generateAgencyLink(agencyId);
    window.open(link, '_blank');
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
      >
        <Building className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentAgency.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Agency</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {agencies.map((agency) => (
                  <motion.div
                    key={agency.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className="flex items-center justify-between p-3 rounded-lg cursor-pointer group"
                    onClick={() => handleAgencySelect(agency.id)}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <img
                        src={agency.logo}
                        alt={`${agency.name} Logo`}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{agency.name}</h4>
                        <p className="text-sm text-gray-500 truncate">{agency.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => copyAgencyLink(agency.id, e)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="Copy agency link"
                      >
                        {copiedLinks[agency.id] ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => openAgencyLink(agency.id, e)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Share agency-specific links with your partners. Each link will show their branding automatically.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AgencySelector;