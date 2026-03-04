import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddReadingScreen } from '../screens/AddReadingScreen';
import { MeterHistoryScreen } from '../screens/MeterHistoryScreen';
import { ReportsScreen } from '../screens/ReportsScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  AddReading: undefined;
  MeterHistory: undefined;
  Reports: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddReading"
        component={AddReadingScreen}
        options={{ title: 'Add Reading' }}
      />
      <Stack.Screen
        name="MeterHistory"
        component={MeterHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
