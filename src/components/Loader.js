import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../const';

export default function Loader({animating, size, color = Colors.white}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={animating} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
