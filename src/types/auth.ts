export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'agency_admin' | 'agent' | 'user';
  avatar?: string;
  phone?: string;
  agencyId?: string; // Only for agency_admin and agent roles
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const PERMISSIONS = {
  AGENCIES: {
    VIEW: 'agencies:view',
    CREATE: 'agencies:create',
    UPDATE: 'agencies:update',
    DELETE: 'agencies:delete',
    MANAGE_ALL: 'agencies:manage_all'
  },
  PROPERTIES: {
    VIEW: 'properties:view',
    CREATE: 'properties:create',
    UPDATE: 'properties:update',
    DELETE: 'properties:delete',
    MANAGE_ALL: 'properties:manage_all'
  },
  AGENTS: {
    VIEW: 'agents:view',
    CREATE: 'agents:create',
    UPDATE: 'agents:update',
    DELETE: 'agents:delete',
    MANAGE_ALL: 'agents:manage_all'
  },
  USERS: {
    VIEW: 'users:view',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
    MANAGE_ALL: 'users:manage_all'
  },
  ANALYTICS: {
    VIEW: 'analytics:view',
    VIEW_ALL: 'analytics:view_all'
  },
  SYSTEM: {
    SETTINGS: 'system:settings',
    LOGS: 'system:logs',
    BACKUP: 'system:backup'
  }
} as const;

export const ROLE_PERMISSIONS = {
  super_admin: [
    // Full access to everything
    PERMISSIONS.AGENCIES.MANAGE_ALL,
    PERMISSIONS.PROPERTIES.MANAGE_ALL,
    PERMISSIONS.AGENTS.MANAGE_ALL,
    PERMISSIONS.USERS.MANAGE_ALL,
    PERMISSIONS.ANALYTICS.VIEW_ALL,
    PERMISSIONS.SYSTEM.SETTINGS,
    PERMISSIONS.SYSTEM.LOGS,
    PERMISSIONS.SYSTEM.BACKUP
  ],
  agency_admin: [
    // Limited to their agency only
    PERMISSIONS.AGENCIES.VIEW,
    PERMISSIONS.PROPERTIES.VIEW,
    PERMISSIONS.PROPERTIES.CREATE,
    PERMISSIONS.PROPERTIES.UPDATE,
    PERMISSIONS.PROPERTIES.DELETE,
    PERMISSIONS.AGENTS.VIEW,
    PERMISSIONS.AGENTS.CREATE,
    PERMISSIONS.AGENTS.UPDATE,
    PERMISSIONS.AGENTS.DELETE,
    PERMISSIONS.USERS.VIEW,
    PERMISSIONS.ANALYTICS.VIEW
  ],
  agent: [
    PERMISSIONS.PROPERTIES.VIEW,
    PERMISSIONS.PROPERTIES.CREATE,
    PERMISSIONS.PROPERTIES.UPDATE
  ],
  user: [
    PERMISSIONS.PROPERTIES.VIEW
  ]
} as const;