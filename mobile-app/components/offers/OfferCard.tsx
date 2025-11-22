import { View, Text, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

interface OfferCardProps {
  image: string;
  companyName: string;
  offersCount: number;
  onPress: () => void;
  index?: number;
}

const OfferCard: React.FC<OfferCardProps> = ({
  image,
  companyName,
  offersCount,
  onPress,
  index = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    // Reset animation values
    opacity.value = 0;
    translateY.value = 30;
    scale.value = 0.95;
    
    // Stagger animation: delay based on index
    const delay = index * 100; // 100ms delay between each card
    
    const timeoutId = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [index, companyName, offersCount]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const getPlaceholderColor = (name: string) => {
    const colors = ['#588157', '#3A5A40', '#344E41', '#A3B18A'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <Animated.View
      className="rounded-2xl overflow-hidden mb-4 mx-6"
      style={[
        {
          backgroundColor: '#FFFFFF',
          shadowColor: '#344E41',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
        animatedStyle,
      ]}
    >
      <View className="p-4 flex-row items-center">
        {/* Left Side - Company Logo */}
        <View className="mr-4">
          {image && !imageError ? (
            <Image
              source={{ uri: image }}
              className="w-20 h-20 rounded-xl"
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <View
              className="w-20 h-20 rounded-xl items-center justify-center"
              style={{ backgroundColor: getPlaceholderColor(companyName) }}
            >
              <Text className="text-white text-2xl font-bold">
                {companyName.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Center - Company Info */}
        <View className="flex-1 justify-center">
          <Text
            className="text-lg font-bold mb-1"
            style={{ color: '#344E41' }}
            numberOfLines={2}
          >
            {companyName}
          </Text>
          <Text
            className="text-sm font-medium"
            style={{ color: '#588157' }}
          >
            {offersCount} {offersCount === 1 ? 'offer' : 'offers'}
          </Text>
        </View>

        {/* Right Side - Action Button */}
        <View className="ml-2">
          <Pressable
            onPress={onPress}
            className="py-3 px-5 rounded-xl active:opacity-80"
            style={{ backgroundColor: '#588157' }}
          >
            <Text className="text-white text-center font-semibold text-sm">
              View
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

export default OfferCard;