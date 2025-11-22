import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
} from "react-native-reanimated";

interface QualityResult {
  tier: "DONATE" | "RECYCLE" | "REJECT";
  recommendation: string;
  conditionSummary: string;
  confidence: number;
  qualityScore: number;
}

interface QualityCheckResultProps {
  visible: boolean;
  result: QualityResult | null;
  onClose: () => void;
}

export const QualityCheckResult = ({
  visible,
  result,
  onClose,
}: QualityCheckResultProps) => {
  if (!result) return null;

  const getConfig = () => {
    switch (result.tier) {
      case "DONATE":
        return {
          icon: "checkmark-circle",
          color: "#10B981",
          bgColor: "#D1FAE5",
          title: "✅ Donate",
        };
      case "RECYCLE":
        return {
          icon: "reload-circle",
          color: "#F59E0B",
          bgColor: "#FEF3C7",
          title: "♻️ Recycle",
        };
      case "REJECT":
        return {
          icon: "close-circle",
          color: "#EF4444",
          bgColor: "#FEE2E2",
          title: "⛔ Reject",
        };
      default:
        return {
          icon: "help-circle",
          color: "#6B7280",
          bgColor: "#F3F4F6",
          title: "Unknown",
        };
    }
  };

  const config = getConfig();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const iconScale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, { damping: 12, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 150 });
      iconScale.value = withSequence(
        withTiming(1.2, { duration: 100 }),
        withSpring(1, { damping: 8, stiffness: 200 })
      );
    } else {
      scale.value = withTiming(0.8, { duration: 100 });
      opacity.value = withTiming(0, { duration: 100 });
      iconScale.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    };
  });

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View className="flex-1 bg-black/50 justify-center items-center px-6" style={overlayStyle}>
        <Animated.View className="bg-white rounded-2xl p-6 w-full max-w-sm" style={animatedStyle}>
          <View className="items-center mb-6">
            <Animated.View className="rounded-full p-4 mb-4" style={[{ backgroundColor: config.bgColor }, iconStyle]}>
              <Ionicons name={config.icon as any} size={48} color={config.color} />
            </Animated.View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">{config.title}</Text>
          </View>

          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Condition:</Text>
            <Text className="text-gray-600 mb-4">{result.conditionSummary}</Text>
            <Text className="text-sm font-semibold text-gray-700 mb-2">Recommendation:</Text>
            <Text className="text-gray-600">{result.recommendation}</Text>
            <View className="mt-4 pt-4 border-t border-gray-200">
              <Text className="text-xs text-gray-500">
                Confidence: {result.confidence}% | Score: {result.qualityScore}/100
              </Text>
            </View>
          </View>

          <Pressable onPress={onClose} className="bg-[#1A4D2E] py-4 rounded-xl">
            <Text className="text-white font-semibold text-center text-lg">Got it</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
