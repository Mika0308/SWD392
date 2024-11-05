import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardItem from '../component/card/CardItem';
import SearchTool from '../component/tools/SearchTool';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../component/navigation/types';
import { fetchWalletData } from '../api/walletApi';
import { formatCurrency } from '../utils/formatCurrency';

const HomeScreen: React.FC = () => {
    const [userName, setProfileName] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<AuthNavigationProp>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                const token = await AsyncStorage.getItem('accessToken');

                if (!id || !token) {
                    console.log('Cannot find userId or token in AsyncStorage');
                    return;
                }

                // Fetch user profile
                const profileResponse = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!profileResponse.ok) {
                    throw new Error(`HTTP error! status: ${profileResponse.status}`);
                }

                const profileData = await profileResponse.json();
                setProfileName(profileData.userName);

                // Fetch wallet data
                const walletData = await fetchWalletData(id, token);
                setBalance(walletData.balance);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // Add your search logic here
    };

    const handleFilterPress = () => {
        // Add your filter logic here
    };

    const cardItems = [
        { title: 'Cao Cấp 1', description: 'Bài toán cao cấp về giải tích.', imageUrl: 'https://i.pinimg.com/564x/9a/61/0d/9a610d643ff38384540a4ab15b21faa9.jpg' },
        { title: 'Cao Cấp 2', description: 'Bài toán cao cấp về giải tích.', imageUrl: 'https://i.pinimg.com/564x/c4/f3/03/c4f3031defd547795cbf7bca64173c6d.jpg' },
        { title: 'Toán Hình 1', description: 'Bài toán hình học cơ bản.', imageUrl: 'https://i.pinimg.com/564x/50/77/9f/50779f38c8cc9d7f44d3eebf2d67f0d9.jpg' },
        { title: 'Toán Hình 2', description: 'Bài toán hình học nâng cao.', imageUrl: 'https://i.pinimg.com/564x/ef/8a/ed/ef8aeda05b626ac8d4bf6c50154cc107.jpg' },
    ];

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
        <LinearGradient colors={['#08C2FF', '#BCF2F6']} style={styles.headerBodyContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MindMath</Text>
            </View>
            <View style={styles.middleCard}>
                <View style={styles.statusItem}>
                    <Text style={styles.statusText}>{userName}</Text>
                    <Text style={styles.statusSubText}>Welcome back!</Text>
                </View>
                <View style={styles.statusItem}>
                    <View style={styles.coinContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                            <MaterialIcons name="monetization-on" size={24} color="gold" />
                        </TouchableOpacity>
                        <Text style={styles.statusText}>
                            {formatCurrency(balance)} VND
                        </Text>
                    </View>
                    <Text style={styles.statusSubText}>balance</Text>
                </View>
            </View>
        </LinearGradient>
            <ScrollView style={styles.container}>
                <SearchTool onSearch={handleSearch} onFilterPress={handleFilterPress} />
                <Text style={styles.welcomeText}>Featured</Text>
                {cardItems.map((item, index) => (
                    <CardItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </ScrollView>
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
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5, // Spacing between icon and text
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;