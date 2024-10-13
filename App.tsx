import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './src/component/navigation/Tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Toast from 'react-native-toast-message';
import { showToast } from './src/component/notification/Toast'; // Adjust the path to where showToast is defined

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
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
          {() => (
            <RegisterScreen
              onRegisterSuccess={() => {
                setIsAuthenticated(true);
                showToast('Registration Successful', 'Welcome!', 'success');
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
