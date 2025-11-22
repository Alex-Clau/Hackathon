import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingsMenuItem {
  icon: string;
  label: string;
  onPress?: () => void;
}

interface SettingsSectionProps {
  items: SettingsMenuItem[];
}

export const SettingsSection = ({ items }: SettingsSectionProps) => {
  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-4">Settings</Text>

      {items.map((item, index) => (
        <View key={item.label}>
          {index > 0 && <View className="border-t border-gray-200 my-2" />}
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={item.onPress || (() => {})}
          >
            <Ionicons name={item.icon as any} size={24} color="#1A4D2E" />
            <Text className="text-gray-800 text-base ml-3 flex-1">
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
