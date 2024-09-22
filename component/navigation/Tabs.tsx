import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import ChatScreen from '../../screens/ChatScreen';
import FindScreen from '../../screens/FindScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SettingScreen from '../../screens/SettingScreen';
import styles from './Tabs.module.css'; // Import CSS Module

type TabParamList = {
    Home: undefined;
    Find: undefined;
    Chat: undefined;
    Setting: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: { [key in keyof TabParamList]: keyof typeof MaterialIcons.glyphMap } = {
    Home: 'home',
    Find: 'search',
    Chat: 'chat',
    Setting: 'settings',
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
            <Tab.Screen name="Find" component={FindScreen} options={{ tabBarLabel: 'Find' }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarLabel: 'Chat' }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{ tabBarLabel: 'Settings' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>

    );
};

export default Tabs;
