export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  beds: number;
  baths: number;
  area: number;
  type: 'house' | 'apartment' | 'condo' | 'villa';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  images: string[];
  features: string[];
  agent: Agent;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
  isFeatured?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  experience: number;
  properties: number;
  rating: number;
  specialties: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalSales: number;
  totalRevenue: number;
  activeListings: number;
  pendingApprovals: number;
  totalAgents: number;
  totalUsers: number;
  monthlyGrowth: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  property: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}