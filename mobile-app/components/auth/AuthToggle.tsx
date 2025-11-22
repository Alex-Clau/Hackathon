import { View, Text, TouchableOpacity } from 'react-native';

interface AuthToggleProps {
  mode: 'login' | 'signup';
  loading: boolean;
  onToggle: () => void;
}

export const AuthToggle = ({ mode, loading, onToggle }: AuthToggleProps) => {
  return (
    <View className="flex-row justify-center items-center mt-6">
      <Text style={{ color: '#4F6F52' }}>
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
      </Text>
      <TouchableOpacity onPress={onToggle} disabled={loading}>
        <Text 
          className="font-semibold"
          style={{ color: '#1A4D2E' }}
        >
          {mode === 'login' ? 'Sign Up' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
