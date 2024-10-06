// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';
import LoginScreen from './src/screens/LoginScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hardcoded credentials
  const predefinedUsername = 'Coca';
  const predefinedPassword = '12345';

  const handleLogin = (username: string, password: string) => {
    // Check if the entered credentials match the predefined ones
    if (username === predefinedUsername && password === predefinedPassword) {
      setIsAuthenticated(true); // Successful login
    } else {
      alert('Invalid credentials'); // Show error if credentials don't match
    }
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tabs />  // Show Tabs after successful authentication
      ) : (
        <LoginScreen onLogin={handleLogin} />  // Show LoginScreen if not authenticated
      )}
    </NavigationContainer>
  );
};

export default App;
