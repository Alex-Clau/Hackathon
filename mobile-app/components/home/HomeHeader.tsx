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
    <View className="px-6 pt-12 pb-4 bg-white border-b border-gray-200">
      <Text className="text-2xl font-bold text-gray-900 mb-1">
        Welcome to the App
      </Text>
      <Text className="text-gray-600 text-sm">
        Browse {offersCount} available offers
      </Text>
      {user && (
      <TouchableOpacity
        className="absolute top-12 right-6 bg-red-600 rounded-lg px-4 py-2"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-sm">Logout</Text>
      </TouchableOpacity>
      )}
    </View>
  );
};
