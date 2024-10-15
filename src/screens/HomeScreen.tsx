// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardItem from '../component/card/CardItem';

const HomeScreen: React.FC = () => {
    const cardItems = [
        { title: 'Cao Cấp 1', description: 'Bài toán cao cấp về giải tích.', imageUrl: 'https://i.pinimg.com/564x/9a/61/0d/9a610d643ff38384540a4ab15b21faa9.jpg' },
        { title: 'Cao Cấp 2', description: 'Bài toán cao cấp về giải tích.', imageUrl: 'https://i.pinimg.com/564x/c4/f3/03/c4f3031defd547795cbf7bca64173c6d.jpg' },
        { title: 'Toán Hình 1', description: 'Bài toán hình học cơ bản.', imageUrl: 'https://i.pinimg.com/564x/50/77/9f/50779f38c8cc9d7f44d3eebf2d67f0d9.jpg' },
        { title: 'Toán Hình 2', description: 'Bài toán hình học nâng cao.', imageUrl: 'https://i.pinimg.com/564x/ef/8a/ed/ef8aeda05b626ac8d4bf6c50154cc107.jpg' },
    ];

    return (
        <View style={styles.screenContainer}>
            <LinearGradient colors={['#08C2FF', '#BCF2F6']} style={styles.headerBodyContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Home</Text>
                </View>
                <View style={styles.middleCard}>
                    <View style={styles.statusItem}>
                        <Text style={styles.statusText}>24°C</Text>
                        <Text style={styles.statusSubText}>avg house temp</Text>
                    </View>
                    <View style={styles.statusItem}>
                        <Text style={styles.statusText}>69%</Text>
                        <Text style={styles.statusSubText}>humidity</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Routines</Text>
                {cardItems.map((item, index) => (
                    <CardItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    headerBodyContainer: {
        paddingBottom: 20,
        paddingTop: 35,
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    middleCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        marginTop: 20,
        elevation: 5,
    },
    statusItem: {
        alignItems: 'center',
    },
    statusText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    statusSubText: {
        fontSize: 14,
        color: '#666',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
});

export default HomeScreen;
