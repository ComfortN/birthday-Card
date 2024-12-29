import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from '../components/SplashScreen';
import HomeScreen from '../components/HomeScreen';
import CardMakerScreen from '../components/BirthdayCard';
import PreviewScreen from '../components/PreviewScreen';

// Types
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  CardMaker: undefined;
  Preview: { cardData: CardData };
};

export type CardData = {
  decorations: any;
  isBold: any;
  isItalic: any;
  isUnderline: any;
  image: React.JSX.Element;
  recipientName: string;
  message: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
};

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreenComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardMaker"
        component={CardMakerScreen}
        options={{ title: 'Create Card' }}
      />
      <Stack.Screen
        name="Preview"
        component={PreviewScreen}
        options={{ title: 'Preview Card' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  text: {
    color: 'white'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: "#fff",
  }
})
