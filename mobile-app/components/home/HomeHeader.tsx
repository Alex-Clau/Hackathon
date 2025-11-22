import { View, Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface HomeHeaderProps {
  offersCount: number;
}

export const HomeHeader = ({ offersCount }: HomeHeaderProps) => {
  const { user } = useAuthContext();
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(-10);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: titleTranslateY.value }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleButtonPressIn = () => {
    buttonScale.value = withSpring(0.9);
  };

  const handleButtonPressOut = () => {
    buttonScale.value = withSpring(1);
  };

  return (
    <View className="px-6 pt-16 pb-6" style={{ backgroundColor: "#1A4D2E" }}>
      <View className="flex-row items-center justify-between">
        <Animated.View className="flex-1" style={titleStyle}>
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: "#FFFFFF" }}
          >
            Discover Offers
          </Text>
          <Text className="text-base" style={{ color: "#E8DFCA" }}>
            {offersCount} {offersCount === 1 ? "active partner" : "active partners"}
          </Text>
        </Animated.View>
        {user && (
          <AnimatedTouchableOpacity
            className="rounded-full p-2"
            style={[
              {
                backgroundColor: "#4F6F52",
                shadowColor: "#4F6F52",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              },
              buttonStyle,
            ]}
            onPress={handleProfilePress}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Ionicons name="person-outline" size={24} color="#FFFFFF" />
          </AnimatedTouchableOpacity>
        )}
      </View>
    </View>
  );
};
