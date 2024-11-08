import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

type TabParamList = {
    EditProfile: undefined;
    ChangePassword: undefined;
};
interface Profile {
    fullname: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string | null;
}

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: { [key in keyof TabParamList]: keyof typeof MaterialIcons.glyphMap } = {
    EditProfile: 'person',
    ChangePassword: 'password',
};

// Edit Profile Component
const EditProfile = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState<Profile | null>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.status !== 'granted') {
                Alert.alert("Permission to access camera roll is required!");
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const fetchProfile = async () => {
        setLoading(true); // Set loading to true when fetching
        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id) {
                console.log('User ID not found in AsyncStorage');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProfile({
                fullname: data.fullname,
                email: data.email,
                phoneNumber: data.phoneNumber,
                avatarUrl: data.avatar || null,
            });
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id || !token) {
                console.log('User ID or Access Token not found in AsyncStorage');
                setError('User ID or access token not found. Please log in again.');
                return;
            }

            // Check if input values are provided
            if (!fullname || !email || !phoneNumber) {
                console.log('Input values are not set');
                setError('Please fill in all fields before submitting.');
                return;
            }

            // Create FormData to send the image and other fields
            const formData = new FormData();

            // Check if an image is selected
            if (image) {
                formData.append('File', {
                    uri: image, // Ensure this is the correct URI from the image picker
                    type: 'image/jpeg', // Adjust based on your actual image type
                    name: 'profile.jpg', // Name for the file
                } as unknown as Blob);
            }

            // Append other fields
            formData.append('Email', email);
            formData.append('Fullname', fullname);
            formData.append('PhoneNumber', phoneNumber);

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to update profile. Response:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Profile updated successfully.");
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Your Profile</Text>
            <View style={styles.profileImageContainer} >
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title="Pick an image from camera roll" onPress={pickImage} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder={profile?.fullname || "Full Name"}
                    value={fullname}
                    onChangeText={setFullname}
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder={profile?.phoneNumber || "Phone Number"}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder={profile?.email || "Email"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" style={styles.loading} />
            ) : (
                <TouchableOpacity style={styles.saveButton} onPress={updateUserProfile}>
                    <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>
    );
};

// Change Password Component
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const changePassword = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Validate if new password matches confirm password
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!oldPassword || !newPassword) {
            setError('Please fill in all fields before submitting.');
            setLoading(false);
            return;
        }

        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id || !token) {
                setError('User ID or access token not found. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to change password. Response:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setSuccess('Password changed successfully!');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setError('Failed to change password. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" />
            ) : (
                <Button title="Change Password" onPress={changePassword} disabled={loading} />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}
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
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    tabBar: {
        paddingBottom: 5,
        height: 50,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#006BFF',
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        backgroundColor: '#2f95dc',
        borderRadius: 20,
        padding: 5,
    },
    editIconText: {
        color: '#fff',
        fontSize: 12,
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        // marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#2f95dc',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
    loading: {
        marginVertical: 20,
    },
});

export default SettingsScreen;
