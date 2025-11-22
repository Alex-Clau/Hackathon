import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

interface AccountInfoProps {
  email?: string | null;
  displayName?: string | null;
  memberSince?: string;
}

export const AccountInfo = ({
  email,
  displayName,
  memberSince,
}: AccountInfoProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      className="bg-white m-4 p-6 rounded-xl shadow-sm"
      style={[
        {
          shadowColor: "#1A4D2E",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        animatedStyle,
      ]}
    >
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Account Information
      </Text>
      <View className="space-y-3">
        <View className="flex-row items-center py-2">
          <Ionicons name="mail-outline" size={20} color="#1A4D2E" />
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs">Email</Text>
            <Text className="text-gray-800 text-base">
              {email || "Not available"}
            </Text>
          </View>
        </View>
        <View className="border-t border-gray-200" />
        <View className="flex-row items-center py-2">
          <Ionicons name="person-outline" size={20} color="#1A4D2E" />
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs">Display Name</Text>
            <Text className="text-gray-800 text-base">
              {displayName || "Not set"}
            </Text>
          </View>
        </View>
        <View className="border-t border-gray-200" />
        <View className="flex-row items-center py-2">
          <Ionicons name="calendar-outline" size={20} color="#1A4D2E" />
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs">Member Since</Text>
            <Text className="text-gray-800 text-base">
              {memberSince || "Unknown"}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

