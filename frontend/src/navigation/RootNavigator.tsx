import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import InvitePartnerScreen from '../screens/InvitePartnerScreen';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const MainTabsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#131315' }}>
    <Text style={{ color: '#ffffff' }}>Main Tabs Placeholder</Text>
  </View>
);

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="InvitePartner" component={InvitePartnerScreen} />
      <Stack.Screen name="MainTabs" component={MainTabsPlaceholder} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
