import React, { useState } from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Tabs from './src/component/navigation/Tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CreateRequestScreen from './src/screens/CreateRequestScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import WalletScreen from './src/screens/WalletScreen';
import Toast from 'react-native-toast-message';
import { showToast } from './src/component/notification/Toast';
import VNPayScreen from './src/screens/VNPayScreen';

// Define type for navigation params for each screen
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Rule: undefined;
  Request: undefined;
  Order: undefined;
  Setting: undefined;
  Wallet: undefined;
  VNPay: { paymentUrl: string }; // VNPay requires paymentUrl as a parameter
};

// Define props type for VNPayScreen with navigation and route
type VnPayScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'VNPay'>;
  route: RouteProp<RootStackParamList, 'VNPay'>;
};

// Create a linking configuration for deep linking
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      Rule: 'rule',
      Request: 'request',
      Order: 'order-history',
      Setting: 'settings',
      Wallet: 'wallet',
      VNPay: 'vnpay/:paymentUrl',
    },
  },
};

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Main App component
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {() =>
            isAuthenticated ? (
              <Tabs />
            ) : (
              <LoginScreen
                onLoginSuccess={() => {
                  setIsAuthenticated(true);
                  showToast('Login Successful', 'Welcome back!', 'success');
                }}
              />
            )
          }
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          options={{ title: 'Register' }}
        >
          {({ navigation }) => (
            <RegisterScreen
              onRegisterSuccess={() => {
                showToast('Registration Successful', 'Welcome!', 'success');
                navigation.navigate('Login');
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Rule" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Request" component={CreateRequestScreen} />
        <Stack.Screen name="Order" component={OrderHistoryScreen} />
        <Stack.Screen name="Setting" component={SettingsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen
          name="VNPay"
          component={VNPayScreen}
          options={{ title: 'VNPay Payment' }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
