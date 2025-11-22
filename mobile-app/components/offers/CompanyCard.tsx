import {View, Text, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

interface CompanyCardProps {
  image: string;
  companyName: string;
  offersCount: number;
  onPress: () => void;
  index?: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
                                                   image,
                                                   companyName,
                                                   offersCount,
                                                   onPress,
                                                   index = 0,
                                                 }) => {
  const [imageError, setImageError] = useState(false);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = 30;
    scale.value = 0.95;

    const delay = index * 100;
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
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  const getPlaceholderColor = (name: string) => {
    const colors = ['#4F6F52', '#1A4D2E', '#2D5F3F', '#3A7049'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <Animated.View
      className="mb-4 mx-4"
      style={animatedStyle}
    >
      {/* Paper stack layers behind */}
      <View
        className="absolute rounded-2xl"
        style={{
          top: 6,
          left: 3,
          right: -3,
          height: '100%',
          backgroundColor: '#D4C5B0',
          opacity: 0.4,
        }}
      />
      <View
        className="absolute rounded-2xl"
        style={{
          top: 3,
          left: 1.5,
          right: -1.5,
          height: '100%',
          backgroundColor: '#DDD5C7',
          opacity: 0.6,
        }}
      />

      {/* Main card */}
      <View
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: '#F0EBE3',
        }}
      >
        <View className="p-4 flex-row items-center">
          <View className="mr-4">
            {image && !imageError ? (
              <View
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: '#FAFAFA',
                  padding: 8,
                }}
              >
                <Image
                  source={{uri: image}}
                  className="w-16 h-16"
                  resizeMode="contain"
                  onError={() => setImageError(true)}
                />
              </View>
            ) : (
              <View
                className="w-20 h-20 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: getPlaceholderColor(companyName),
                }}
              >
                <Text className="text-white text-2xl font-bold">
                  {companyName.charAt(0)}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-1 justify-center">
            <Text
              className="text-lg font-bold mb-1"
              style={{color: '#1A4D2E'}}
              numberOfLines={2}
            >
              {companyName}
            </Text>
            <Text
              className="text-sm font-medium"
              style={{color: '#4F6F52'}}
            >
              {offersCount} {offersCount === 1 ? 'offer' : 'offers'}
            </Text>
          </View>

          <View className="ml-2">
            <Pressable
              onPress={onPress}
              className="py-3 px-5 rounded-xl active:opacity-80"
              style={{backgroundColor: '#1A4D2E'}}
            >
              <Text className="text-white text-center font-semibold text-sm">
                View
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default CompanyCard;