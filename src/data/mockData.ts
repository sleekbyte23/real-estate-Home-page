import { Property, Agent, DashboardStats, Testimonial, BlogPost } from '../types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@realestate.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Experienced real estate professional with over 10 years in luxury properties.',
    experience: 10,
    properties: 45,
    rating: 4.9,
    specialties: ['Luxury Homes', 'Commercial', 'Investment Properties']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@realestate.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializing in residential properties and first-time home buyers.',
    experience: 7,
    properties: 32,
    rating: 4.8,
    specialties: ['Residential', 'First-time Buyers', 'Condos']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@realestate.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert in commercial real estate and property investment strategies.',
    experience: 12,
    properties: 67,
    rating: 4.9,
    specialties: ['Commercial', 'Investment', 'Development']
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'Stunning modern villa with panoramic city views, featuring high-end finishes and smart home technology.',
    price: 1250000,
    location: 'Beverly Hills, CA',
    address: '123 Luxury Lane, Beverly Hills, CA 90210',
    beds: 5,
    baths: 4,
    area: 3500,
    type: 'villa',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Swimming Pool', 'Garage', 'Garden', 'Smart Home', 'Security System', 'Fireplace'],
    agent: mockAgents[0],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    description: 'Luxurious penthouse in the heart of downtown with breathtaking skyline views.',
    price: 850000,
    location: 'Downtown, NY',
    address: '456 Sky Tower, New York, NY 10001',
    beds: 3,
    baths: 3,
    area: 2200,
    type: 'apartment',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['City View', 'Balcony', 'Gym Access', 'Concierge', 'Rooftop Terrace'],
    agent: mockAgents[1],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Cozy Family Home',
    description: 'Perfect family home in a quiet neighborhood with excellent schools nearby.',
    price: 450000,
    location: 'Suburbia, TX',
    address: '789 Family Street, Suburbia, TX 75001',
    beds: 4,
    baths: 2,
    area: 1800,
    type: 'house',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Backyard', 'Garage', 'Near Schools', 'Quiet Neighborhood', 'Updated Kitchen'],
    agent: mockAgents[2],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Waterfront Condo',
    description: 'Beautiful waterfront condominium with private beach access and marina views.',
    price: 675000,
    location: 'Miami Beach, FL',
    address: '321 Ocean Drive, Miami Beach, FL 33139',
    beds: 2,
    baths: 2,
    area: 1400,
    type: 'condo',
    status: 'for-rent',
    images: [
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Ocean View', 'Beach Access', 'Marina', 'Pool', 'Fitness Center'],
    agent: mockAgents[0],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22',
    isFeatured: true
  },
  {
    id: '5',
    title: 'Mountain View Cabin',
    description: 'Rustic cabin with stunning mountain views and modern amenities.',
    price: 425000,
    location: 'Aspen, CO',
    address: '789 Mountain Trail, Aspen, CO 81611',
    beds: 3,
    baths: 2,
    area: 1600,
    type: 'house',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Mountain View', 'Fireplace', 'Deck', 'Hiking Trails', 'Ski Access'],
    agent: mockAgents[1],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-18',
    isFeatured: false
  },
  {
    id: '6',
    title: 'Urban Loft',
    description: 'Modern loft in the heart of downtown with exposed brick and high ceilings.',
    price: 550000,
    location: 'Chicago, IL',
    address: '456 Urban Street, Chicago, IL 60601',
    beds: 2,
    baths: 1,
    area: 1200,
    type: 'apartment',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Exposed Brick', 'High Ceilings', 'Downtown Location', 'Modern Kitchen', 'Rooftop Access'],
    agent: mockAgents[2],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-21',
    isFeatured: true
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 186,
  totalSales: 89,
  totalRevenue: 45600000,
  activeListings: 97,
  pendingApprovals: 12,
  totalAgents: 24,
  totalUsers: 1247,
  monthlyGrowth: 12.5
};

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    comment: 'Excellent service! Found my dream home within a week. The team was professional and responsive.',
    property: 'Modern Luxury Villa',
    date: '2024-01-20'
  },
  {
    id: '2',
    name: 'Lisa Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    comment: 'Amazing experience from start to finish. Highly recommend their services!',
    property: 'Downtown Penthouse',
    date: '2024-01-18'
  },
  {
    id: '3',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4,
    comment: 'Great team, very knowledgeable about the market. Made the buying process smooth.',
    property: 'Cozy Family Home',
    date: '2024-01-15'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips for First-Time Home Buyers',
    excerpt: 'Essential advice for navigating your first home purchase successfully.',
    content: 'Buying your first home is an exciting milestone...',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Sarah Johnson',
    date: '2024-01-20',
    category: 'Buying Guide',
    readTime: 5
  },
  {
    id: '2',
    title: 'Real Estate Market Trends 2024',
    excerpt: 'Analyzing the current market conditions and future predictions.',
    content: 'The real estate market in 2024 shows interesting trends...',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Michael Chen',
    date: '2024-01-18',
    category: 'Market Analysis',
    readTime: 8
  },
  {
    id: '3',
    title: 'Investment Properties: What to Look For',
    excerpt: 'Key factors to consider when investing in real estate.',
    content: 'Real estate investment can be highly profitable...',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Emily Rodriguez',
    date: '2024-01-15',
    category: 'Investment',
    readTime: 6
  }
];