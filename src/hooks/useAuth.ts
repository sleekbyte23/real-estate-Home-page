import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState, ROLE_PERMISSIONS } from '../types/auth';

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: 'super_1',
    name: 'Developer Admin',
    email: 'dev@realestate.com',
    role: 'super_admin',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '+1 (555) 000-0001',
    permissions: ROLE_PERMISSIONS.super_admin.map(perm => ({
      resource: perm.split(':')[0],
      actions: [perm.split(':')[1]]
    })),
    createdAt: '2024-01-01',
    lastLogin: '2024-01-25',
    isActive: true
  },
  {
    id: 'agency_1',
    name: 'ABC Realty Admin',
    email: 'admin@abcrealty.com',
    role: 'agency_admin',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '+1 (555) 123-4567',
    agencyId: 'abc_realty',
    permissions: ROLE_PERMISSIONS.agency_admin.map(perm => ({
      resource: perm.split(':')[0],
      actions: [perm.split(':')[1]]
    })),
    createdAt: '2024-01-05',
    lastLogin: '2024-01-24',
    isActive: true
  },
  {
    id: 'agency_2',
    name: 'XYZ Properties Admin',
    email: 'admin@xyzproperties.com',
    role: 'agency_admin',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '+1 (555) 987-6543',
    agencyId: 'xyz_properties',
    permissions: ROLE_PERMISSIONS.agency_admin.map(perm => ({
      resource: perm.split(':')[0],
      actions: [perm.split(':')[1]]
    })),
    createdAt: '2024-01-08',
    lastLogin: '2024-01-23',
    isActive: true
  }
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Simulate checking for stored auth token
    const checkAuth = () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    setTimeout(checkAuth, 1000); // Simulate loading time
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    const user = MOCK_USERS.find(u => u.email === email);
    if (user && password === 'admin123') {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    
    // Super admin has all permissions
    if (authState.user.role === 'super_admin') return true;
    
    return authState.user.permissions.some(perm => 
      `${perm.resource}:${perm.actions[0]}` === permission ||
      perm.actions.includes(permission.split(':')[1])
    );
  };

  const canAccessAgency = (agencyId: string): boolean => {
    if (!authState.user) return false;
    
    // Super admin can access all agencies
    if (authState.user.role === 'super_admin') return true;
    
    // Agency admin can only access their own agency
    if (authState.user.role === 'agency_admin') {
      return authState.user.agencyId === agencyId;
    }
    
    return false;
  };

  return {
    ...authState,
    login,
    logout,
    hasPermission,
    canAccessAgency
  };
};

// Auth Context
export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};