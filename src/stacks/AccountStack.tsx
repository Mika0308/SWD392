// import React from "react";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from "../screens/LoginScreen";
// import RegisterScreen from "../screens/Register";

// const Stack = createNativeStackNavigator();

// export const AccountStack = () => {
//     const handleLogin = (username: string, password: string) => {
//         // Handle login logic here
//         console.log("Login with:", username, password);
//     };

//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="Login"
//                 // Use render instead of component for custom props
//                 render={(props) => <LoginScreen {...props} onLogin={handleLogin} />}
//             />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//         </Stack.Navigator>
//     );
// };
