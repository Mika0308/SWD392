import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TabParamList = {
    EditProfile: undefined;
    ChangePassword: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: { [key in keyof TabParamList]: keyof typeof MaterialIcons.glyphMap } = {
    EditProfile: 'person',
    ChangePassword: 'password',
};

// Edit Profile Component
const EditProfile = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUserProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id) {
                console.log('User ID not found in AsyncStorage');
                setError('User ID not found. Please log in again.');
                return;
            }

            // Check if input values are provided
            if (!fullname || !email || !phoneNumber) {
                console.log('Input values are not set');
                setError('Please fill in all fields before submitting.');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    phoneNumber,
                }),
            });

            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text(); // Get the raw response text
                console.error('Failed to update profile. Response:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Parse the JSON
            console.log("User profile updated successfully:", data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" />
            ) : (
                <Button
                    title="Save Profile"
                    onPress={updateUserProfile}
                />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

// Change Password Component
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
            />
            <Button title="Change Password" onPress={() => alert("Password changed")} />
        </View>
    );
};

const SettingsScreen = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                const iconName = ICONS[route.name];
                return <MaterialIcons name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: '#2f95dc',
            tabBarInactiveTintColor: '#8e8e93',
            tabBarStyle: styles.tabBar,
            headerShown: false,
        })}>
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
        padding: 20,
    },
    tabBar: {
        paddingBottom: 5,
        height: 50,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default SettingsScreen;
