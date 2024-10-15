// SettingsScreen.tsx
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const EditProfile = () => {
    return (
        <View style={styles.container}>
            <Text>Edit Profile</Text>
            {/* Add your edit profile form here */}
        </View>
    );
};

const ChangePassword = () => {
    return (
        <View style={styles.container}>
            <Text>Change Password</Text>
            {/* Add your change password form here */}
        </View>
    );
};

const SettingsScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
            <Tab.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;
