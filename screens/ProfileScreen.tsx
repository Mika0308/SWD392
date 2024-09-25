import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        console.log('Logging in with:', username, password);
    };

    const handleRegister = () => {
        console.log('Registering with:', username, email, password, confirmPassword);
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.lovepik.com/background/20211030/medium/lovepik-blue-background-mobile-phone-wallpaper-image_400389734.jpg' }}
            style={styles.background}
        >
            <View style={styles.overlay} />
            {/* Blurred container for the form */}
            <BlurView intensity={90} style={styles.blurContainer}>
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
            </BlurView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject, // Makes the background fill the entire screen
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay for the image
    },
    blurContainer: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Optional: for extra clarity behind the blur
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    toggleText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 12,
    },
});

export default LoginScreen;
