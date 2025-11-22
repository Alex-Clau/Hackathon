import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';

interface HomeHeaderProps {
  offersCount: number;
}

export const HomeHeader = ({ offersCount }: HomeHeaderProps) => {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View 
      className="px-6 pt-16 pb-6"
      style={{ backgroundColor: '#3A5A40' }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-3xl font-bold mb-2" style={{ color: '#DAD7CD' }}>
            Discover Offers
          </Text>
          <Text className="text-base" style={{ color: '#A3B18A' }}>
            {offersCount} {offersCount === 1 ? 'offer' : 'offers'} available
          </Text>
        </View>
        {user && (
          <TouchableOpacity
            className="rounded-lg px-4 py-2"
            style={{ backgroundColor: '#588157' }}
            onPress={handleLogout}
          >
            <Text className="text-white font-semibold text-sm">Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
