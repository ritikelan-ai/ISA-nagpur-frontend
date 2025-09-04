import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Doctor {
  id: string;
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  specialization: string[];
  qualifications: string;
  contactNumber: string;
  clinicName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  medicalRegistrationNumber: string;
  profilePicture?: string;
  yearsOfExperience: number;
  isaNumber: string;
  userType: 'user' | 'admin';
  isOnline: boolean;
  isApproved: boolean;
}

interface AuthContextType {
  user: Doctor | null;
  login: (email: string, otp: string) => Promise<void>;
  register: (doctorData: Partial<Doctor>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Doctor>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      const mockUser: Doctor = {
        id: '1',
        email,
        fullName: 'Dr. John Doe',
        gender: 'Male',
        dateOfBirth: '1980-01-01',
        specialization: ['Cardiology'],
        qualifications: 'MBBS, MD',
        contactNumber: '+1234567890',
        clinicName: 'City Hospital',
        location: {
          city: 'New York',
          state: 'NY',
          country: 'USA'
        },
        medicalRegistrationNumber: 'MED123456',
        yearsOfExperience: 15,
        isaNumber: 'ISA789',
        userType: 'user',
        isOnline: true,
        isApproved: true
      };
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (doctorData: Partial<Doctor>) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with actual API call
      console.log('Registering doctor:', doctorData);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (data: Partial<Doctor>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};