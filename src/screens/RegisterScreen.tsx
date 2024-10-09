import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../component/navigation/types'; // Adjust the import path as necessary
import { host_main, API_REGISTER } from '../api/api'; // Import API constants

const RegisterScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<AuthNavigationProp>(); // Use the defined type for navigation

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${host_main}${API_REGISTER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            Alert.alert('Registration Successful', `Welcome ${data.username}`);
            navigation.navigate('Login'); // Navigate to LoginScreen after successful registration
        } catch (error: unknown) {  // Explicitly typing error as unknown
            if (error instanceof Error) {
                Alert.alert('Registration Failed', error.message || 'An error occurred');
            } else {
                Alert.alert('Registration Failed', 'An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
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
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Register</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5', // Light background color
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333', // Darker text color for contrast
    },
    input: {
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000', // Add shadow for depth
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, // Elevation for Android shadow
    },
    button: {
        backgroundColor: '#007BFF', // Primary button color
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
