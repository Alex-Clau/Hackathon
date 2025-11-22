import { View, Text } from "react-native";

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
  return (
    <View
      className={`rounded-2xl p-5 ${isLarge ? "mb-4" : ""}`}
      style={{ backgroundColor }}
    >
      <Text
        className={`${isLarge ? "text-3xl" : "text-2xl"} font-bold ${
          isLarge ? "mb-2" : "mb-1"
        }`}
        style={{ color: textColor }}
      >
        {value}
      </Text>
      <Text style={{ color: labelColor, fontSize: isLarge ? 16 : 14 }}>
        {label}
      </Text>
    </View>
  );
};
