import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardItem from '../component/card/CardItem';
import SearchTool from '../component/tools/SearchTool';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchWalletData } from '../api/walletApi';
import { AuthNavigationProp } from '../component/navigation/types';
import { formatCurrency } from '../utils/formatCurrency';
const HomeScreen: React.FC = () => {
    const [userName, setProfileName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<AuthNavigationProp>();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                const token = await AsyncStorage.getItem('accessToken');

                if (!id) {
                    console.log('Can not find userId trong AsyncStorage');
                    return;
                }

                const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProfileName(data.userName);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchWalletDataFromAPI = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const token = await AsyncStorage.getItem('accessToken');
                if (!userId || !token) {
                    console.log('User ID or access token is missing.');
                    return;
                }

                // Fetch balance data
                const walletData = await fetchWalletData(userId, token);
                setBalance(walletData.balance);
            } catch (error) {
                console.error('Failed to fetch wallet data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWalletDataFromAPI();
    }, []);

    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // Add your search logic here
    };

    const handleFilterPress = () => {
        // Add your filter logic here
    };

    const cardItems = [
        { title: 'Circles 1', description: 'Area of a Circle.', imageUrl: 'https://i.pinimg.com/564x/9a/61/0d/9a610d643ff38384540a4ab15b21faa9.jpg' },
        { title: 'Circles 2', description: 'Circumference of a Circle.', imageUrl: 'https://i.pinimg.com/564x/c4/f3/03/c4f3031defd547795cbf7bca64173c6d.jpg' },
        { title: 'Triangles 1', description: 'Area of a Triangles.', imageUrl: 'https://i.pinimg.com/564x/50/77/9f/50779f38c8cc9d7f44d3eebf2d67f0d9.jpg' },
        { title: 'Triangles 2', description: 'Perimeter of a Triangles.', imageUrl: 'https://i.pinimg.com/564x/ef/8a/ed/ef8aeda05b626ac8d4bf6c50154cc107.jpg' },
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
                            <Text style={styles.statusText}>{formatCurrency(balance)} VND</Text>
                        </View>
                        <Text style={styles.statusSubText}>balance</Text>
                    </View>
                </View>
            </LinearGradient>
            <ScrollView style={styles.container}>
                {/* Add the new Coca frame here */}
                <View style={styles.demoFrame}>
                    <Text style={styles.titleText}>MindMath</Text>
                    <Text style={styles.createText}>Creator</Text>
                    <Text style={styles.desText}>Instantly turn your text inputs into publish-worthy math videos. Simplify the process, generate scripts, and add video clips with ease. Create professional math content at scale!</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Chat')}>
                            <Text style={styles.buttonText}>Create Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Order')}>
                            <Text style={styles.buttonText}>Browse Video</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5,
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

    // New style for the Coca frame
    demoFrame: {
        maxWidth: '100%',
        height: 260,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    titleText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#4CC9FE',
    },
    createText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    desText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#A6AEBF',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row', // Make buttons appear side by side
        justifyContent: 'space-between', // Space between the buttons
        width: '100%', // Make the button container take up full width
        paddingHorizontal: 20, // Add horizontal padding to the buttons
        marginTop: 'auto', // Push the buttons to the bottom of the screen
        paddingVertical: 20,
    },
    button1: {
        backgroundColor: '#7AB2D3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '45%',
        alignItems: 'center',
        borderWidth: 2, // Add border width
        borderColor: '#7AB2D3', // Set border color (dark shade of button1)
    },
    button2: {
        backgroundColor: '#C4E1F6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '45%',
        alignItems: 'center',
        borderWidth: 2, // Add border width
        borderColor: '#C4E1F6', // Set border color (dark shade of button2)
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;