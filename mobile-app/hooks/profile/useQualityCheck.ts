import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { apiClient } from "../../lib/api";

interface QualityResult {
  tier: "DONATE" | "RECYCLE" | "REJECT";
  recommendation: string;
  conditionSummary: string;
  confidence: number;
  qualityScore: number;
}

export const useQualityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QualityResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Camera permission is needed to scan clothing items.");
        return;
      }

      const photoResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
        base64: false,
      });

      if (photoResult.canceled || !photoResult.assets[0]) {
        return;
      }

      setLoading(true);
      const imageUri = photoResult.assets[0].uri;
      
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: 'base64',
      });

      const qualityResult = await apiClient.estimateQuality(base64);
      setResult(qualityResult);
      setShowResult(true);

      if (qualityResult.tier === "REJECT") {
        Alert.alert(
          "⛔ Item Rejected",
          `${qualityResult.conditionSummary}\n\n${qualityResult.recommendation}`
        );
      }
    } catch (error) {
      console.error("Quality check error:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to check item quality."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeResult = () => {
    setShowResult(false);
    setResult(null);
  };

  return {
    loading,
    result,
    showResult,
    takePhoto,
    closeResult,
  };
};
