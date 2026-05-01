import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Dumbbell, History, Footprints } from 'lucide-react-native';
import DashboardScreen from '../screens/DashboardScreen';
import { Colors } from '../theme/colors';

// Placeholders for screens not yet implemented
const Placeholder = () => null;

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home color={color} size={size} />;
          if (route.name === 'Workout') return <Dumbbell color={color} size={size} />;
          if (route.name === 'History') return <History color={color} size={size} />;
          if (route.name === 'Steps') return <Footprints color={color} size={size} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Workout" component={Placeholder} />
      <Tab.Screen name="History" component={Placeholder} />
      <Tab.Screen name="Steps" component={Placeholder} />
    </Tab.Navigator>
  );
}
