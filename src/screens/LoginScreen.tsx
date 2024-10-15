import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthNavigationProp } from '../component/navigation/types';
import { host_main, API_LOGIN } from '../api/api';
import { jwtDecode } from 'jwt-decode';

interface Props {
    onLoginSuccess: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<AuthNavigationProp>();

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

            // Lưu token vào AsyncStorage
            await AsyncStorage.setItem('accessToken', data.accessToken);

            // Kiểm tra token
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                console.log('Token saved:', token);

                // Giải mã token
                const decodedToken = jwtDecode<{ Id: string }>(token);
                const userId = decodedToken.Id;
                console.log('User ID:', userId);
                // Lưu userId vào AsyncStorage
                await AsyncStorage.setItem('userId', userId);
                console.log('User ID saved:', userId);
            } else {
                console.log('Can not find token');
            }

            onLoginSuccess();
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Login Failed', error.message || 'An error occurred');
            } else {
                Alert.alert('Login Failed', 'An unknown error occurred');
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
                    onPress={() => navigation.navigate('Register')}
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
