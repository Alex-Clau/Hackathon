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
    <View className="bg-[#3A5A40] px-6 pt-16 pb-6">
      <View className="flex-row items-center mb-4">
        <Pressable onPress={onBackPress} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#DAD7CD" />
        </Pressable>
        <Text className="text-2xl font-bold" style={{ color: "#DAD7CD" }}>
          {title}
        </Text>
      </View>
      {(userName || userEmail) && (
        <View className="mt-2">
          <Text className="text-lg" style={{ color: "#A3B18A" }}>
            {userName || "User"}
          </Text>
          <Text className="text-sm" style={{ color: "#A3B18A" }}>
            {userEmail}
          </Text>
        </View>
      )}
    </View>
  );
};

