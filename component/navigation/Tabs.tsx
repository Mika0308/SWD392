import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ChatScreen from '../../screens/ChatScreen';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import WalletScreen from '../../screens/WalletScreen';
import styles from './Tabs.module.css';

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
    Wallet: 'wallet',
    Profile: 'person',
};

const Tabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const iconName = ICONS[route.name];
                    return <MaterialIcons name={iconName} style={{ color, fontSize: size }} className={styles.tabIcon} />;
                },
                tabBarActiveTintColor: styles.tabBarActive,
                tabBarInactiveTintColor: styles.tabBarInactive,
                tabBarStyle: {
                    paddingBottom: 5,
                    height: 50,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarLabel: 'Chat' }} />
            <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>

    );
};

export default Tabs;