import { View, ScrollView, Alert } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { useProfileActions } from "../hooks/profile/useProfileActions";
import { useQRScanner } from "../hooks/profile/useQRScanner";
import { usePendingOffers } from "../hooks/admin/usePendingOffers";
import { useAdminStats } from "../hooks/admin/useAdminStats";
import { useEffect } from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { QRScannerSection } from "../components/profile/QRScannerSection";
import { PendingOffersList } from "../components/admin/PendingOffersList";
import { LogoutButton } from "../components/profile/LogoutButton";
import { QRScannerModal } from "../components/profile/QRScannerModal";
import { GradientBackground } from "../components/common/GradientBackground";

export default function AdminProfileScreen() {
  const { user, logout } = useAuthContext();
  const { handleLogout, handleBackPress } = useProfileActions(logout);
  const {
    scanning,
    scannedUserId,
    handleScanQR,
    handleBarCodeScanned,
    closeScanner,
    clearScannedUser,
  } = useQRScanner();
  const {
    pendingOffers,
    activeOffers,
    loading: pendingLoading,
    fetchPendingOffers,
    activateOffer,
    redeemOffer,
  } = usePendingOffers(user?.email || null);
  const { refreshStats } = useAdminStats();

  useEffect(() => {
    if (scannedUserId) {
      fetchPendingOffers(scannedUserId, user?.email || null);
    } else {
      fetchPendingOffers("", user?.email || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedUserId, user?.email]);

  const handleActivateOffer = async (userOfferId: string) => {
    const success = await activateOffer(userOfferId);
    if (success) {
      Alert.alert("Success", "Offer activated! User can now redeem it.");
      refreshStats(); // Refresh dashboard stats to update engagements count
      if (scannedUserId) {
        fetchPendingOffers(scannedUserId, user?.email || null);
      }
    } else {
      Alert.alert("Error", "Failed to activate offer. The offer may have expired or there was an error.");
    }
    return success;
  };

  const handleRedeemOffer = async (userOfferId: string) => {
    const success = await redeemOffer(userOfferId);
    if (success) {
      Alert.alert("Success", "Offer redeemed!");
      refreshStats(); // Refresh dashboard stats to update engagements count
      if (scannedUserId) {
        fetchPendingOffers(scannedUserId, user?.email || null);
      }
    } else {
      Alert.alert("Error", "Failed to redeem offer");
    }
  };

  return (
    <GradientBackground variant="light">
      <View className="flex-1">
        <ProfileHeader
          title="Admin Profile"
          userName={user?.displayName}
          userEmail={user?.email}
          onBackPress={() => {
            clearScannedUser();
            handleBackPress(true);
          }}
        />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <QRScannerSection
            scannedUserId={scannedUserId}
            onScanQR={handleScanQR}
          />
          {scannedUserId && (
            <PendingOffersList
              pendingOffers={pendingOffers}
              activeOffers={activeOffers}
              onActivate={handleActivateOffer}
              onRedeem={handleRedeemOffer}
            />
          )}
        </ScrollView>
        <LogoutButton onLogout={handleLogout} />
        <QRScannerModal
          visible={scanning}
          onClose={closeScanner}
          onBarcodeScanned={handleBarCodeScanned}
        />
      </View>
    </GradientBackground>
  );
}
