import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: styles.secondaryButton,
          text: styles.secondaryButtonText,
          loaderColor: '#007BFF',
        };
      case 'danger':
        return {
          button: styles.dangerButton,
          text: styles.dangerButtonText,
          loaderColor: '#FFFFFF',
        };
      case 'primary':
      default:
        return {
          button: styles.primaryButton,
          text: styles.primaryButtonText,
          loaderColor: '#FFFFFF',
        };
    }
  };

  const variantStyle = getVariantStyles();
  const isButtonDisabled = disabled || loading;

  return (
    <Animated.View style={[{ transform: [{ scale: animatedScale }] }, styles.container]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isButtonDisabled}
        style={({ pressed }) => [
          styles.button,
          variantStyle.button,
          pressed && styles.pressed,
          isButtonDisabled && styles.disabledButton,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variantStyle.loaderColor} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              variantStyle.text,
              isButtonDisabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#007BFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#007BFF',
    elevation: 0,
    shadowOpacity: 0,
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#007BFF',
  },
  dangerButtonText: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.9,
  },
  disabledButton: {
    backgroundColor: '#D1D1D6',
    borderColor: '#D1D1D6',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledText: {
    color: '#8E8E93',
  },
});
