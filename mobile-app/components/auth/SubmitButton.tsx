import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface SubmitButtonProps {
  mode: 'login' | 'signup';
  loading: boolean;
  onPress: () => void;
}

export const SubmitButton = ({ mode, loading, onPress }: SubmitButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20, stiffness: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 100 });
  };

  return (
    <AnimatedTouchableOpacity
      className={`rounded-xl py-4 mb-4 ${loading ? 'opacity-50' : ''}`}
      style={[
        {
          backgroundColor: '#1A4D2E',
          shadowColor: '#1A4D2E',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        },
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white text-center font-semibold text-base">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
};
