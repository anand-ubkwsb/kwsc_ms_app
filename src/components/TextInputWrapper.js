import React from 'react';
import {View, TextInput} from 'react-native';
import {Colors} from '../const';

export default function TextInputWrapper({
  containerStyle,
  inputContainerStyle,
  label,
  isPassword,
  keyboardType,
  returnType,
  onChangeText,
  editable,
  maxLength,
  onSubmitEditing,
  autoFocus,
  onFocus,
  onBlur,
  childern,
  reference,
  inputValue,
  placeholderTextColor = Colors.secondary,
  multiline,
}) {
  return (
    <View style={containerStyle}>
      <TextInput
        ref={reference}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        style={inputContainerStyle}
        placeholder={label}
        placeholderTextColor={placeholderTextColor}
        value={inputValue}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        returnKeyType={returnType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
      />
      {childern}
    </View>
  );
}
