import { View, Text, TouchableOpacity } from 'react-native';

interface AuthToggleProps {
  mode: 'login' | 'signup';
  loading: boolean;
  onToggle: () => void;
}

export const AuthToggle = ({ mode, loading, onToggle }: AuthToggleProps) => {
  return (
    <View className="flex-row justify-center items-center">
      <Text className="text-gray-600">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
      </Text>
      <TouchableOpacity onPress={onToggle} disabled={loading}>
        <Text className="text-blue-600 font-semibold">
          {mode === 'login' ? 'Sign Up' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
