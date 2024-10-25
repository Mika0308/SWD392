import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ChatScreen from '../../screens/ChatScreen';
// import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
// import WalletScreen from '../../screens/WalletScreen';
import { StyleSheet } from 'react-native';
import WalletScreen from 'screens/WalletScreen';

type TabParamList = {
    Home: undefined;
    Search: undefined;
    Tool: undefined;
    Wallet: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: { [key in keyof TabParamList]: keyof typeof MaterialIcons.glyphMap } = {
    Home: 'home',
    Search: 'search',
    Tool: 'calculate',
    Wallet: 'account-balance-wallet',
    Profile: 'person',
};

const Tabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const iconName = ICONS[route.name];
                    return <MaterialIcons name={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: '#2f95dc',
                tabBarInactiveTintColor: '#8e8e93',
                tabBarStyle: styles.tabBar,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            {/* <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} /> */}
            <Tab.Screen name="Tool" component={ChatScreen} options={{ tabBarLabel: 'Tool' }} />
            <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} />
            {/* <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} /> */}
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        paddingBottom: 5,
        height: 50,
    },
});

export default Tabs;
