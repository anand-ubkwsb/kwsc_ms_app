import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function ButtonWrapper({
  label,
  onPress,
  activeOpacity,
  buttonStyle,
  labelStyle,
  buttonContainerStyle,
  disabled,
}) {
  return (
    <View style={buttonContainerStyle}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
        style={buttonStyle}>
        <Text style={labelStyle}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
