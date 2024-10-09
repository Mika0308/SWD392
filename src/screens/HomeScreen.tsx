import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
    const cardItems = [
        { title: 'Cao Cấp 1', description: 'Bài toán cao cấp về đại số tuyến tính.' },
        { title: 'Cao Cấp 2', description: 'Bài toán cao cấp về giải tích.' },
        { title: 'Toán Hình 1', description: 'Bài toán hình học cơ bản.' },
        { title: 'Toán Hình 2', description: 'Bài toán hình học nâng cao.' },
    ];

    return (
        <View style={styles.screenContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome name="bars" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mind Math</Text>
                <TouchableOpacity style={styles.coinsButton}>
                    <Text style={styles.coinsText}>10</Text>
                    <FontAwesome name="dollar" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Welcome to Home!</Text>
                {cardItems.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 35,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#e0f7fa',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    coinsButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinsText: {
        fontSize: 18,
        marginRight: 4,
    },
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