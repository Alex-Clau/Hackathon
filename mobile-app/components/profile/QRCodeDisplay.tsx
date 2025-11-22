import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useState, useEffect } from "react";
import { QRInfoModal } from "./QRInfoModal";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

interface QRCodeDisplayProps {
  userId?: string;
}

export const QRCodeDisplay = ({ userId }: QRCodeDisplayProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const pulseScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);

  useEffect(() => {
    // Card entrance animation
    cardOpacity.value = withTiming(1, { duration: 600 });
    cardTranslateY.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });

    // Subtle pulse animation for QR code
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
    };
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [{ translateY: cardTranslateY.value }],
    };
  });

  const infoItems = [
    {
      icon: "checkmark-circle",
      title: "Show to Redeem Offers",
      description: "Present this QR code to participating stores to redeem your available offers.",
    },
    {
      icon: "shield-checkmark",
      title: "Secure & Unique",
      description: "Your QR code is unique to your account and securely linked to your offers.",
    },
    {
      icon: "scan",
      title: "Quick Verification",
      description: "Store staff will scan your code to instantly verify and apply your offers.",
    },
  ];

  return (
    <Animated.View className="m-4" style={cardStyle}>
      <View className="bg-white p-6 rounded-xl shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="qr-code" size={28} color="#1A4D2E" />
          <Text className="text-xl font-bold text-gray-800 ml-3">
            Your QR Code
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowInfo(true)}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#4F6F52"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-gray-600 mb-6 text-center">
        Show this QR code to redeem your offers
      </Text>
      <Animated.View
        className="items-center justify-center bg-white p-6 rounded-xl"
        style={[styles.qrContainer, pulseStyle]}
      >
        {userId ? (
          <QRCode
            value={userId}
            size={200}
            color="#1A4D2E"
            backgroundColor="white"
          />
        ) : (
          <View
            className="items-center justify-center"
            style={{ width: 200, height: 200 }}
          >
            <Ionicons name="alert-circle" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2">No QR code available</Text>
          </View>
        )}
      </Animated.View>
      <Text className="text-gray-500 text-xs text-center mt-4">
        User ID: {userId?.substring(0, 8)}...
      </Text>
      </View>

      <QRInfoModal
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        title="How to Use Your QR Code"
        items={infoItems}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
