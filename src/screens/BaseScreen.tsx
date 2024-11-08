import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const BaseScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/45/17/5e/45175e958da8c47355888651b87ca013.jpg' }} // Your image URL here
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Welcome to MindMath!</Text>
                <Text style={styles.text}>The official website of Mind Math will bring you a new experience in studying mathematics.</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    innerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",
        color: '#fff', // Text color to make it visible on the image background
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#A6AEBF',
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#C4E1F6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#C4E1F6',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BaseScreen;
