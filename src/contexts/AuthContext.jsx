import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default admin credentials
const DEFAULT_ADMIN = {
  email: 'admin@orbithub.com',
  password: 'admin123', // In a real app, this would be hashed
  role: 'admin',
  name: 'Admin User'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check for admin credentials
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      const adminUser = { ...DEFAULT_ADMIN, id: 'admin-1' };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true };
    }

    // Check for regular user credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser, password: undefined };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    // Create new user
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log in the new user
    const userDataWithoutPassword = { ...newUser, password: undefined };
    setUser(userDataWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userDataWithoutPassword));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};