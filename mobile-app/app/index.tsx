import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useOffers } from "../hooks/useOffers";
import { HomeHeader } from "../components/home/HomeHeader";
import { OffersList } from "../components/offers/OffersList";
import { LoadingScreen } from "../components/home/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useQualityCheck } from "../hooks/profile/useQualityCheck";
import { QualityCheckResult } from "../components/profile/QualityCheckResult";
import { useAuthContext } from "../contexts/AuthContext";
import { GradientBackground } from "../components/common/GradientBackground";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const { offers, loading } = useOffers();
  const { user, userData } = useAuthContext();
  const { loading: aiLoading, result, showResult, takePhoto, closeResult } = useQualityCheck();
  
  const aiButtonScale = useSharedValue(1);
  const qrButtonScale = useSharedValue(1);
  const aiButtonPulse = useSharedValue(1);

  // Subtle pulse animation for AI button
  React.useEffect(() => {
    if (user && userData?.role !== "admin") {
      aiButtonPulse.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [user, userData]);

  const aiButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: aiButtonScale.value * aiButtonPulse.value }
      ],
    };
  });

  const qrButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: qrButtonScale.value }],
    };
  });

  const handleAiPressIn = () => {
    aiButtonScale.value = withSpring(0.9);
  };

  const handleAiPressOut = () => {
    aiButtonScale.value = withSpring(1);
  };

  const handleQrPressIn = () => {
    qrButtonScale.value = withSpring(0.95);
  };

  const handleQrPressOut = () => {
    qrButtonScale.value = withSpring(1);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (offers.length === 0) {
    return (
      <GradientBackground variant="light">
        <View
          className="flex-1 justify-center items-center px-6"
        >
        <Text className="text-lg text-center mb-2" style={{ color: "#1A4D2E" }}>
          No offers available
        </Text>
        <Text className="text-sm text-center" style={{ color: "#4F6F52" }}>
          Check if backend server is running on port 3000
        </Text>
      </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="light">
      <View className="flex-1">
      <HomeHeader offersCount={offers.length} />
      <OffersList offers={offers} />

      {/* Floating Buttons */}
      <View
        className="absolute bottom-6 left-0 right-0 items-center px-6"
        style={{ zIndex: 999 }}
      >
        <View className="flex-row items-center justify-center gap-4 w-full">
          {user && userData?.role !== "admin" && (
            <AnimatedTouchableOpacity
              className="rounded-full p-4"
              style={[
                {
                  backgroundColor: "#4F6F52",
                  shadowColor: "#4F6F52",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 8,
                },
                aiButtonStyle,
              ]}
              onPress={takePhoto}
              onPressIn={handleAiPressIn}
              onPressOut={handleAiPressOut}
              disabled={aiLoading}
            >
              {aiLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="camera" size={24} color="white" />
              )}
            </AnimatedTouchableOpacity>
          )}
          
          <AnimatedTouchableOpacity
            className="rounded-full px-6 py-4 flex-row items-center"
            style={[
              {
                backgroundColor: "#1A4D2E",
                shadowColor: "#1A4D2E",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 8,
              },
              qrButtonStyle,
            ]}
            onPress={() => router.push("/profile")}
            onPressIn={handleQrPressIn}
            onPressOut={handleQrPressOut}
          >
            <Ionicons
              name="qr-code"
              size={24}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text
              className="font-semibold text-base"
              style={{ color: "#FFFFFF" }}
            >
              Show My QR Code
            </Text>
          </AnimatedTouchableOpacity>
        </View>
      </View>

      <QualityCheckResult
        visible={showResult}
        result={result}
        onClose={closeResult}
      />
    </View>
    </GradientBackground>
  );
}
