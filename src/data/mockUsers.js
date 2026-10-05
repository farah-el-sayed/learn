// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    password: 'hashed_password_123',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'student',
    isActive: true,
    isVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-09-30T08:45:00Z',
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true
    }
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    password: 'hashed_password_456',
    firstName: 'Jane',
    lastName: 'Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'instructor',
    isActive: true,
    isVerified: true,
    createdAt: '2024-02-20T14:20:00Z',
    lastLogin: '2024-09-30T09:15:00Z',
    preferences: {
      language: 'en',
      theme: 'dark',
      notifications: true
    }
  },
  {
    id: 3,
    email: 'michael.johnson@example.com',
    password: 'hashed_password_789',
    firstName: 'Michael',
    lastName: 'Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'student',
    isActive: true,
    isVerified: true,
    createdAt: '2024-03-10T11:00:00Z',
    lastLogin: '2024-09-29T16:30:00Z',
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: false
    }
  },
  {
    id: 4,
    email: 'sarah.williams@example.com',
    password: 'hashed_password_abc',
    firstName: 'Sarah',
    lastName: 'Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'instructor',
    isActive: true,
    isVerified: true,
    createdAt: '2024-01-05T09:00:00Z',
    lastLogin: '2024-09-30T07:20:00Z',
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true
    }
  },
  {
    id: 5,
    email: 'david.brown@example.com',
    password: 'hashed_password_def',
    firstName: 'David',
    lastName: 'Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: 'student',
    isActive: true,
    isVerified: false,
    createdAt: '2024-09-25T15:45:00Z',
    lastLogin: null,
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true
    }
  }
];
