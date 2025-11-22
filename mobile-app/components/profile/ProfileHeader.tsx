import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileHeaderProps {
  title: string;
  userName?: string | null;
  userEmail?: string | null;
  onBackPress: () => void;
}

export const ProfileHeader = ({
  title,
  userName,
  userEmail,
  onBackPress,
}: ProfileHeaderProps) => {
  return (
    <View className="bg-[#1A4D2E] px-6 pt-16 pb-6">
      <View className="flex-row items-center mb-4">
        <Pressable onPress={onBackPress} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
          {title}
        </Text>
      </View>
      {(userName || userEmail) && (
        <View className="mt-2">
          <Text className="text-lg" style={{ color: "#E8DFCA" }}>
            {userName || "User"}
          </Text>
          <Text className="text-sm" style={{ color: "#E8DFCA" }}>
            {userEmail}
          </Text>
        </View>
      )}
    </View>
  );
};

