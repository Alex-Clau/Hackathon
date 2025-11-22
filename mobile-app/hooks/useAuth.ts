import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuthContext } from '../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';

type AuthMode = 'login' | 'signup';

export const useAuth = () => {
  const { register, login } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFirebaseErrorMessage = (error: FirebaseError): string => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      default:
        return error.message || 'An error occurred';
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    try {
      if (mode === 'signup') {
        await register(name, email, password);
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => router.replace('/') },
        ]);
      } else {
        await login(email, password);
        Alert.alert('Success', 'Logged in successfully', [
          { text: 'OK', onPress: () => router.replace('/') },
        ]);
      }
    } catch (error: any) {
      const errorMessage = error instanceof FirebaseError
        ? getFirebaseErrorMessage(error)
        : 'An error occurred';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setName('');
    setEmail('');
    setPassword('');
  };

  return {
    mode,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errors,
    handleSubmit,
    toggleMode,
  };
};
