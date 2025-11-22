import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge, BADGES, getNextBadge } from "../../lib/badgeSystem";

interface BadgeDisplayProps {
  totalKg: number;
  earnedBadges: Badge[];
}

export const BadgeDisplay = ({ totalKg, earnedBadges }: BadgeDisplayProps) => {
  const nextBadge = getNextBadge(totalKg);
  const earnedBadgeIds = new Set(earnedBadges.map((b) => b.id));

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="ribbon" size={28} color="#3A5A40" />
        <Text className="text-xl font-bold text-gray-800 ml-3">
          Your Badges
        </Text>
      </View>
      <Text className="text-gray-600 mb-4 text-center">
        Earn badges by donating clothing!
      </Text>
      <View className="flex-row flex-wrap justify-around">
        {BADGES.map((badge) => {
          const isEarned = earnedBadgeIds.has(badge.id);
          return (
            <View
              key={badge.id}
              className="items-center mb-6"
              style={{ width: "45%" }}
            >
              <View
                className="rounded-full p-4 mb-2"
                style={{
                  backgroundColor: isEarned ? badge.color : "#E5E7EB",
                  opacity: isEarned ? 1 : 0.5,
                }}
              >
                <Ionicons
                  name={badge.icon as any}
                  size={32}
                  color={isEarned ? "white" : "#9CA3AF"}
                />
              </View>
              <Text
                className="text-sm font-semibold text-center"
                style={{ color: isEarned ? "#344E41" : "#9CA3AF" }}
              >
                {badge.name}
              </Text>
              <Text
                className="text-xs text-center"
                style={{ color: isEarned ? "#588157" : "#D1D5DB" }}
              >
                {badge.kgRequired}kg
              </Text>
              {!isEarned && (
                <Text
                  className="text-xs text-center mt-1"
                  style={{ color: "#9CA3AF" }}
                >
                  {badge.description}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      {nextBadge && (
        <View className="bg-[#F0F7F4] p-4 rounded-lg mt-4">
          <Text className="text-sm font-semibold" style={{ color: "#3A5A40" }}>
            🎯 Next Badge: {nextBadge.name}
          </Text>
          <Text className="text-xs mt-1" style={{ color: "#588157" }}>
            Only {(nextBadge.kgRequired - totalKg).toFixed(1)}kg more to go!
          </Text>
          <View className="mt-2 bg-gray-200 rounded-full h-2">
            <View
              className="bg-[#588157] rounded-full h-2"
              style={{
                width: `${Math.min(
                  (totalKg / nextBadge.kgRequired) * 100,
                  100
                )}%`,
              }}
            />
          </View>
        </View>
      )}
      {!nextBadge && earnedBadges.length === BADGES.length && (
        <View className="bg-[#E8DFCA] p-4 rounded-lg mt-4">
          <Text className="text-center font-bold" style={{ color: "#1A4D2E" }}>
            🎉 Congratulations!
          </Text>
          <Text
            className="text-center text-sm mt-1"
            style={{ color: "#588157" }}
          >
            You've earned all badges! You're a sustainability legend!
          </Text>
        </View>
      )}
    </View>
  );
};

