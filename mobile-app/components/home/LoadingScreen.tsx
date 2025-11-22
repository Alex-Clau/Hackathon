import { View, ActivityIndicator } from 'react-native';
import { GradientBackground } from '../common/GradientBackground';

export const LoadingScreen = () => {
  return (
    <GradientBackground variant="light">
      <View 
        className="flex-1 justify-center items-center"
      >
        <ActivityIndicator size="large" color="#4F6F52" />
      </View>
    </GradientBackground>
  );
};
