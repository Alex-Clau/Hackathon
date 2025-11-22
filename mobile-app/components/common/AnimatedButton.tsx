import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps {
  onPress: () => void;
  className?: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

export const AnimatedButton = ({
  onPress,
  className,
  text,
  backgroundColor,
  textColor = "#FFFFFF",
  disabled = false,
}: AnimatedButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.95);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
    }
  };

  // Extract background color from className or use provided backgroundColor
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (!className) return '#10B981';
    if (className.includes('Activate')) return '#10B981';
    if (className.includes('Redeem')) return '#059669';
    if (className.includes('bg-[#588157]')) return '#10B981';
    if (className.includes('bg-[#10B981]')) return '#059669';
    if (className.includes('bg-[#1A4D2E]')) return '#1A4D2E';
    return '#10B981';
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      className={className}
      style={[
        animatedStyle,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 12,
          minHeight: 48,
          shadowColor: getBackgroundColor(),
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 15,
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
    </AnimatedPressable>
  );
};

