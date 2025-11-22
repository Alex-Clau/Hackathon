import { View, Text } from 'react-native';

type AuthMode = 'login' | 'signup';

interface AuthHeaderProps {
  mode: AuthMode;
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
    <View>
      <Text className="text-3xl font-bold text-center text-gray-900 mb-2">
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </Text>
      <Text className="text-center text-gray-600 mb-8">
        {mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}
      </Text>
    </View>
  );
};
