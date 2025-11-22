import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { apiClient } from '../lib/api';

interface UserData {
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (uid: string, email?: string) => {
    try {
      const data = await apiClient.getUserByUid(uid) as UserData | null;
      setUserData(data);
    } catch (error: any) {
      if (error.message === 'User not found' && email) {
        try {
          await apiClient.createOrUpdateUser(uid, email);
          const data = await apiClient.getUserByUid(uid) as UserData | null;
          setUserData(data);
        } catch (createError) {
          console.error('Error creating user data:', createError);
          setUserData(null);
        }
      } else {
        console.error('Error fetching user data:', error);
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      clearTimeout(timeoutId);
      setUser(currentUser);
      
      if (currentUser?.uid) {
        await fetchUserData(
          currentUser.uid,
          currentUser.email || undefined
        );
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    
    await apiClient.createOrUpdateUser(userCredential.user.uid, email);
    await fetchUserData(userCredential.user.uid, email);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

