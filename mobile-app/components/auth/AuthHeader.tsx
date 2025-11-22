import { View, Text } from 'react-native';

type AuthMode = 'login' | 'signup';

interface AuthHeaderProps {
  mode: AuthMode;
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
    <View className="mb-8">
      <Text 
        className="text-4xl font-bold text-center mb-3"
        style={{ color: '#1A4D2E' }}
      >
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </Text>
      <Text 
        className="text-center text-base"
        style={{ color: '#4F6F52' }}
      >
        {mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}
      </Text>
    </View>
  );
};
