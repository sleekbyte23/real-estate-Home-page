export interface Agency {
  id: string;
  name: string;
  logo: string;
  color: string;
  secondaryColor: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  established: string;
  specialties: string[];
  agentCount: number;
  propertiesCount: number;
  isActive: boolean;
}

export const agencies: Record<string, Agency> = {
  abc_realty: {
    id: 'abc_realty',
    name: 'ABC Realty',
    logo: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=100',
    color: '#007bff',
    secondaryColor: '#0056b3',
    description: 'Premier real estate agency specializing in luxury properties and commercial investments.',
    phone: '+1 (555) 123-4567',
    email: 'info@abcrealty.com',
    website: 'www.abcrealty.com',
    address: '123 Main Street, Downtown, NY 10001',
    established: '1995',
    specialties: ['Luxury Homes', 'Commercial Properties', 'Investment Properties'],
    agentCount: 25,
    propertiesCount: 150,
    isActive: true
  },
  xyz_properties: {
    id: 'xyz_properties',
    name: 'XYZ Properties',
    logo: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100',
    color: '#ff6600',
    secondaryColor: '#e55a00',
    description: 'Modern real estate solutions for residential and commercial properties.',
    phone: '+1 (555) 987-6543',
    email: 'contact@xyzproperties.com',
    website: 'www.xyzproperties.com',
    address: '456 Business Ave, Metro City, CA 90210',
    established: '2010',
    specialties: ['Residential Sales', 'Property Management', 'First-time Buyers'],
    agentCount: 18,
    propertiesCount: 89,
    isActive: true
  },
  green_homes: {
    id: 'green_homes',
    name: 'Green Homes Realty',
    logo: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=100',
    color: '#28a745',
    secondaryColor: '#1e7e34',
    description: 'Eco-friendly real estate agency focused on sustainable and green properties.',
    phone: '+1 (555) 456-7890',
    email: 'hello@greenhomes.com',
    website: 'www.greenhomes.com',
    address: '789 Eco Street, Green Valley, OR 97001',
    established: '2015',
    specialties: ['Eco-Friendly Homes', 'Solar Properties', 'Sustainable Living'],
    agentCount: 12,
    propertiesCount: 67,
    isActive: true
  },
  luxury_estates: {
    id: 'luxury_estates',
    name: 'Luxury Estates International',
    logo: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100',
    color: '#6f42c1',
    secondaryColor: '#5a2d91',
    description: 'Exclusive luxury real estate agency for high-end properties and estates.',
    phone: '+1 (555) 321-0987',
    email: 'concierge@luxuryestates.com',
    website: 'www.luxuryestates.com',
    address: '321 Elite Boulevard, Beverly Hills, CA 90210',
    established: '1985',
    specialties: ['Luxury Estates', 'Penthouses', 'Waterfront Properties'],
    agentCount: 35,
    propertiesCount: 245,
    isActive: true
  },
  metro_realty: {
    id: 'metro_realty',
    name: 'Metro Realty Group',
    logo: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=100',
    color: '#dc3545',
    secondaryColor: '#c82333',
    description: 'Urban real estate specialists serving metropolitan areas with excellence.',
    phone: '+1 (555) 654-3210',
    email: 'info@metrorealty.com',
    website: 'www.metrorealty.com',
    address: '654 Urban Plaza, Metro City, TX 75001',
    established: '2005',
    specialties: ['Urban Properties', 'Condominiums', 'City Living'],
    agentCount: 22,
    propertiesCount: 134,
    isActive: true
  }
};

export const getAgencyFromURL = (): Agency | null => {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const agencyKey = params.get('agency');
  
  if (agencyKey && agencies[agencyKey]) {
    return agencies[agencyKey];
  }
  
  return null;
};

export const getDefaultAgency = (): Agency => {
  return {
    id: 'default',
    name: 'RealEstate Platform',
    logo: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=100',
    color: '#14b8a6',
    secondaryColor: '#0f766e',
    description: 'Your trusted real estate platform connecting buyers, sellers, and agents.',
    phone: '+1 (555) 000-0000',
    email: 'info@realestate.com',
    website: 'www.realestate.com',
    address: '123 Platform Street, Tech City, CA 94000',
    established: '2020',
    specialties: ['All Property Types', 'Technology Solutions', 'Market Analytics'],
    agentCount: 100,
    propertiesCount: 500,
    isActive: true
  };
};

export const generateAgencyLink = (agencyId: string, baseUrl: string = window.location.origin): string => {
  return `${baseUrl}/?agency=${agencyId}`;
};

export const getAllAgencies = (): Agency[] => {
  return Object.values(agencies);
};