import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../component/navigation/types'; // Adjust the import path as necessary
import { host_main, API_LOGIN } from '../api/api'; // Import API constants

interface Props { }

const LoginScreen: React.FC<Props> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<AuthNavigationProp>(); // Use the defined type for navigation

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${host_main}${API_LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            // Process server response
            Alert.alert('Login Successful', `Welcome ${data.username}`);
            navigation.navigate('Home'); // Navigate to Home after successful login
        } catch (error: unknown) { // Explicitly type error as unknown
            if (error instanceof Error) {
                Alert.alert('Login Failed', error.message || 'An error occurred');
            } else {
                Alert.alert('Login Failed', 'An unknown error occurred'); // Fallback for non-Error exceptions
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text
                    style={styles.signupText}
                    onPress={() => navigation.navigate('Register')} // Navigate to RegisterScreen
                >
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    signupText: {
        color: '#007BFF',
        fontWeight: '500',
    },
});

export default LoginScreen;
