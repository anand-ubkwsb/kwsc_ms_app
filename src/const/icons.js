import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

export const Icons = ({iconKey, type, name, color, size, onPress, style}) => {
  switch (type) {
    case 'Feather':
      return (
        <Feather
          key={iconKey}
          onPress={onPress}
          name={name}
          color={color}
          size={size}
          style={style}
        />
      );
    default:
      return null;
  }
};
