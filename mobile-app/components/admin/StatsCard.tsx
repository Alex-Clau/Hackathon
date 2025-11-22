import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from "react-native-reanimated";

interface StatsCardProps {
  value: number;
  label: string;
  backgroundColor: string;
  textColor: string;
  labelColor: string;
  isLarge?: boolean;
}

export const StatsCard = ({
  value,
  label,
  backgroundColor,
  textColor,
  labelColor,
  isLarge = false,
}: StatsCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Update display value immediately
    setDisplayValue(value);
    
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 500 });
  }, [value]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      className={`rounded-2xl p-5 ${isLarge ? "mb-4" : ""}`}
      style={[
        {
          backgroundColor,
          shadowColor: "#1A4D2E",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        },
        animatedTextStyle,
      ]}
    >
      <Text
        className={`${isLarge ? "text-3xl" : "text-2xl"} font-bold ${
          isLarge ? "mb-2" : "mb-1"
        }`}
        style={{ color: textColor }}
      >
        {displayValue}
      </Text>
      <Text style={{ color: labelColor, fontSize: isLarge ? 16 : 14 }}>
        {label}
      </Text>
    </Animated.View>
  );
};
