import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="login"
          getComponent={() => require('../screens/login').default}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="home"
          getComponent={() => require('../screens/home').default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
