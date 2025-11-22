import { View, ScrollView } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { useProfileActions } from "../hooks/profile/useProfileActions";
import { useUserOffers } from "../hooks/offers/useUserOffers";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { QRCodeDisplay } from "../components/profile/QRCodeDisplay";
import { AccountInfo } from "../components/profile/AccountInfo";
import { UserOffersList } from "../components/profile/UserOffersList";
import { LogoutButton } from "../components/profile/LogoutButton";
import { GradientBackground } from "../components/common/GradientBackground";

export default function ProfileScreen() {
  const { user, logout, userData } = useAuthContext();
  const { handleLogout, handleBackPress } = useProfileActions(logout);
  const { userOffers, loading: offersLoading } = useUserOffers();
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : undefined;

  return (
    <GradientBackground variant="light">
      <View className="flex-1">
        <ProfileHeader
          title="My Profile"
          userName={user?.displayName}
          userEmail={user?.email}
          onBackPress={() => handleBackPress(false)}
        />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
            <QRCodeDisplay userId={user?.uid} />
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
