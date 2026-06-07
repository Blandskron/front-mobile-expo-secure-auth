import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
  label?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secureTextEntry?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  error,
  secureTextEntry,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Theme-aware styles
  const textColor = isDark ? '#ECEDEE' : '#11181C';
  const placeholderColor = isDark ? '#9BA1A6' : '#999999';
  const backgroundColor = isDark ? '#2A2C2E' : '#FFFFFF';
  
  let borderColor = isDark ? '#404347' : '#E0E0E0';
  if (isFocused) {
    borderColor = '#007BFF';
  } else if (error) {
    borderColor = '#FF3B30';
  }

  const iconColor = isFocused ? '#007BFF' : (error ? '#FF3B30' : (isDark ? '#9BA1A6' : '#8E8E93'));

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: isDark ? '#A1A1A5' : '#666666' }]}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor,
          },
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={iconColor}
            style={styles.icon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            { color: textColor },
            style,
          ]}
          placeholderTextColor={placeholderColor}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIcon}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={isDark ? '#9BA1A6' : '#8E8E93'}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  rightIcon: {
    padding: 6,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
