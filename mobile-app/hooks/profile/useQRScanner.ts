import { useState } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const useQRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedUserId, setScannedUserId] = useState<string | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const handleScanQR = async () => {
    if (!permission) return;

    if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required to scan QR codes"
        );
        return;
      }
    }
    setScanning(true);
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanning(false);
    await verifyUser(data);
  };

  const verifyUser = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));

      if (userDoc.exists()) {
        setScannedUserId(userId);
        Alert.alert(
          "Success",
          `User found: ${userDoc.data()?.email || userId}`
        );
      } else {
        Alert.alert("Error", "User not found");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      Alert.alert("Error", "Failed to verify user");
    }
  };

  const handleAddOffer = async () => {
    if (!scannedUserId || !selectedOfferId) {
      Alert.alert("Error", "Please scan a user and select an offer first");
      return;
    }

    try {
      const userRef = doc(db, "users", scannedUserId);
      await updateDoc(userRef, {
        redeemedOffers: arrayUnion(selectedOfferId),
      });

      Alert.alert("Success", "Offer added to user account!");
      setScannedUserId(null);
      setSelectedOfferId(null);
    } catch (error) {
      console.error("Error adding offer:", error);
      Alert.alert("Error", "Failed to add offer to user account");
    }
  };

  const closeScanner = () => setScanning(false);

  return {
    scanning,
    scannedUserId,
    selectedOfferId,
    setSelectedOfferId,
    handleScanQR,
    handleBarCodeScanned,
    handleAddOffer,
    closeScanner,
  };
};
