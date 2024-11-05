import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const BaseScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/45/17/5e/45175e958da8c47355888651b87ca013.jpg' }} // Your image URL here
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Welcome to MindMath!</Text>
                <Button
                    title="Sign In"
                    onPress={() => navigation.navigate('Login')}
                />
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Adding a semi-transparent overlay for better readability
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // Text color to make it visible on the image background
    }
});

export default BaseScreen;
