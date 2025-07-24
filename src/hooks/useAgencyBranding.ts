import { useState, useEffect } from 'react';
import { Agency, getAgencyFromURL, getDefaultAgency } from '../data/agencies';

export const useAgencyBranding = () => {
  const [currentAgency, setCurrentAgency] = useState<Agency>(getDefaultAgency());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectAgency = () => {
      const agencyFromURL = getAgencyFromURL();
      const agency = agencyFromURL || getDefaultAgency();
      
      setCurrentAgency(agency);
      
      // Apply CSS custom properties for dynamic theming
      const root = document.documentElement;
      root.style.setProperty('--agency-primary', agency.color);
      root.style.setProperty('--agency-secondary', agency.secondaryColor);
      
      // Update page title
      document.title = `${agency.name} - Real Estate Platform`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', agency.description);
      }
      
      setIsLoading(false);
    };

    detectAgency();
    
    // Listen for URL changes (for SPA navigation)
    window.addEventListener('popstate', detectAgency);
    
    return () => {
      window.removeEventListener('popstate', detectAgency);
    };
  }, []);

  const updateAgency = (agencyId: string) => {
    const newUrl = `${window.location.origin}/?agency=${agencyId}`;
    window.history.pushState({}, '', newUrl);
    
    // Trigger re-detection
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return {
    currentAgency,
    isLoading,
    updateAgency,
    isCustomAgency: currentAgency.id !== 'default'
  };
};