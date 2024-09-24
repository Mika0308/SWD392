import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
    const cardItems = [
        { title: 'Cao Cấp 1', description: 'Bài toán cao cấp về đại số tuyến tính.' },
        { title: 'Cao Cấp 2', description: 'Bài toán cao cấp về giải tích.' },
        { title: 'Toán Hình 1', description: 'Bài toán hình học cơ bản.' },
        { title: 'Toán Hình 2', description: 'Bài toán hình học nâng cao.' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Home!</Text>
            {cardItems.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text>{item.description}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 16,
    },
    card: {
        width: '100%',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
