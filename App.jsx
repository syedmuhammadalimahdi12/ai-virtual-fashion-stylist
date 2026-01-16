import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import ProfileScreen from './Screens/ProfileScreen';
import CreateWardrobeScreen from './Screens/Create_Wardrobe';
import ChooseWardrobeScreen from './Screens/Choose_Wardrobe'; 
import UploadDressScreen from './Screens/UploadDressScreen';
import WardrobeCollectionScreen from './Screens/WardrobeCollectionScreen';
import ShirtScreen from './Screens/Wardrobe/ShirtScreen';
import PantsScreen from './Screens/Wardrobe/PantsScreen';
import MatchSelectorScreen from './Screens/Wardrobe/WhatNeedsMatchScreen';
import PerfectSuggestionScreen from './Screens/PerfectSuggestionScreen';
import FittedOutfitScreen from './Screens/FittedOutfitScreen'



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="CreateWardrobe" component={CreateWardrobeScreen} options={{ title: 'Create Wardrobe' }} />
        <Stack.Screen name="ChooseWardrobe" component={ChooseWardrobeScreen} options={{ title: 'Choose Wardrobe' }} />  
        <Stack.Screen name="UploadDress" component={UploadDressScreen} options={{ title: 'Upload Dress' }} />
        <Stack.Screen name="WardrobeCollectionScreen" component={WardrobeCollectionScreen} options={{ title: 'Wardrobe Collection' }} />
        <Stack.Screen name="ShirtScreen" component={ShirtScreen} options={{ title: 'Shirt' }} />
        <Stack.Screen name="PantsScreen" component={PantsScreen} options={{ title: 'Pants' }} />
        <Stack.Screen name="MatchSelectorScreen" component={MatchSelectorScreen} options={{ title: 'Select Match' }} />
        <Stack.Screen name="PerfectSuggestionScreen" component={PerfectSuggestionScreen} options={{ title: 'Perfect Suggestions' }} />
        <Stack.Screen name="FittedOutfitScreen" component={FittedOutfitScreen} options={{title:"Fitted Outfit"}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}