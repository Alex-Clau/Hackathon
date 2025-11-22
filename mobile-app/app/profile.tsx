import { View, ScrollView } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { useProfileActions } from "../hooks/profile/useProfileActions";
import { useUserOffers } from "../hooks/offers/useUserOffers";
import { useDonationStats } from "../hooks/profile/useDonationStats";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { QRCodeDisplay } from "../components/profile/QRCodeDisplay";
import { AccountInfo } from "../components/profile/AccountInfo";
import { UserOffersList } from "../components/profile/UserOffersList";
import { BadgeDisplay } from "../components/profile/BadgeDisplay";
import { EnvironmentalImpact } from "../components/profile/EnvironmentalImpact";
import { BadgeNotification } from "../components/profile/BadgeNotification";
import { LogoutButton } from "../components/profile/LogoutButton";
import { GradientBackground } from "../components/common/GradientBackground";

export default function ProfileScreen() {
  const { user, logout, userData } = useAuthContext();
  const { handleLogout, handleBackPress } = useProfileActions(logout);
  const { userOffers, loading: offersLoading } = useUserOffers();
  const { totalKg, earnedBadges, newBadge, clearNewBadge } = useDonationStats();
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : undefined;

  return (
    <GradientBackground variant="light">
      <View className="flex-1">
        <BadgeNotification badge={newBadge} onHide={clearNewBadge} />
        <ProfileHeader
          title="My Profile"
          userName={user?.displayName}
          userEmail={user?.email}
          onBackPress={() => handleBackPress(false)}
        />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <QRCodeDisplay userId={user?.uid} />
          <BadgeDisplay totalKg={totalKg} earnedBadges={earnedBadges} />
          <EnvironmentalImpact totalKg={totalKg} />
          <UserOffersList offers={userOffers} />
          <AccountInfo
            email={user?.email}
            displayName={user?.displayName}
            memberSince={memberSince}
          />
        </ScrollView>
        <LogoutButton onLogout={handleLogout} />
      </View>
    </GradientBackground>
  );
}
