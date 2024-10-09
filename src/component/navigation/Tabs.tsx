import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ChatScreen from '../../screens/ChatScreen';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import WalletScreen from '../../screens/WalletScreen';
import { StyleSheet } from 'react-native';

type TabParamList = {
    Home: undefined;
    Search: undefined;
    Chat: undefined;
    Wallet: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: { [key in keyof TabParamList]: keyof typeof MaterialIcons.glyphMap } = {
    Home: 'home',
    Search: 'search',
    Chat: 'chat',
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
                tabBarActiveTintColor: '#2f95dc', // Example color for active tab
                tabBarInactiveTintColor: '#8e8e93', // Example color for inactive tab
                tabBarStyle: styles.tabBar, // Use the style defined in the StyleSheet
                headerShown: false, // No headers for tabs
            })}
        >
            <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarLabel: 'Chat' }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} />
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
