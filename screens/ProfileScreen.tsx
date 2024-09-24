import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        // Handle login logic here
        console.log('Logging in with:', username, password);
    };

    const handleRegister = () => {
        // Handle registration logic here
        console.log('Registering with:', username, email, password, confirmPassword);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Login'}</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {isRegistering && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email (optional)"
                        value={email}
                        onChangeText={setEmail}
                    />
                </>
            )}

            {isRegistering ? (
                <>
                    <Button title="Register" onPress={handleRegister} />
                    <Text style={styles.toggleText} onPress={() => setIsRegistering(false)}>
                        Already have an account? Login
                    </Text>
                </>
            ) : (
                <>
                    <Button title="Login" onPress={handleLogin} />
                    <Text style={styles.toggleText} onPress={() => setIsRegistering(true)}>
                        Don't have an account? Create Account
                    </Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    toggleText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 12,
    },
});

export default LoginScreen;
