import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../component/navigation/types';
import { host_main, API_REGISTER } from '../api/api';

interface Props {
    onRegisterSuccess: () => void;
}

const RegisterScreen: React.FC<Props> = ({ onRegisterSuccess }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<AuthNavigationProp>();

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${host_main}${API_REGISTER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password,
                    phoneNumber,
                    userName,
                }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed with status ${response.status}`);
            }

            // Check if there is a response body and then parse
            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : null;

            // If there's no data, handle it appropriately
            if (!data) {
                throw new Error('No response data from server');
            }

            // Process server response
            onRegisterSuccess();
        } catch (error: unknown) {
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
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Register to get started</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullname}
                onChangeText={setFullname}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor="#888"
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                    style={styles.loginText}
                    onPress={() => navigation.navigate('Login')}
                >
                    Log In
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
        backgroundColor: '#28a745',
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
    loginText: {
        color: '#007BFF',
        fontWeight: '500',
    },
});

export default RegisterScreen;
