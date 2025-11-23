import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface SubmitButtonProps {
  mode: 'login' | 'signup';
  loading: boolean;
  onPress: () => void;
}

export const SubmitButton = ({ mode, loading, onPress }: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      className={`rounded-xl py-4 mb-4 ${loading ? 'opacity-50' : ''}`}
      style={{ backgroundColor: '#588157' }}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white text-center font-semibold text-base">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </Text>
      )}
    </TouchableOpacity>
  );
};
