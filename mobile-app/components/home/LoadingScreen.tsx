import { View, ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View 
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: '#DAD7CD' }}
    >
      <ActivityIndicator size="large" color="#588157" />
    </View>
  );
};
