import React from 'react';
import { Text, View, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Math Solver AI</Text>
                <TouchableOpacity style={styles.coinsButton}>
                    <Text style={styles.coinsText}>10</Text>
                    <FontAwesome name="dollar" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Search Input for Math Problems */}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput placeholder="Ask a math question..." style={styles.searchInput} />
                <TouchableOpacity>
                    <FontAwesome name="arrow-right" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Filter Section */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton}>
                    <FontAwesome name="filter" size={16} color="black" />
                    <Text style={styles.filterText}>Sort by Difficulty</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <FontAwesome name="clock-o" size={16} color="black" />
                    <Text style={styles.filterText}>Newest First</Text>
                </TouchableOpacity>
            </View>

            {/* AI Response with Video Solutions */}
            <ScrollView style={styles.scrollContainer}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={styles.responseCard}>
                        <Image source={{ uri: 'https://i.imgur.com/IpEsYSH.png' }} style={styles.videoThumbnail} />
                        <View style={styles.responseTextContainer}>
                            <Text style={styles.responseTitle}>Math Solution Video {index + 1}</Text>
                            <Text style={styles.responseDescription}>AI-generated explanation for your math question</Text>
                            <View style={styles.coinsInfo}>
                                <Text style={styles.coinsTextSmall}>5</Text>
                                <FontAwesome name="dollar" size={14} color="black" />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    coinsButton: { flexDirection: 'row', alignItems: 'center' },
    coinsText: { fontSize: 18, marginRight: 4 },

    // Search Bar Styling
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
    },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, fontSize: 16 },

    // Filter Section Styling
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    filterText: {
        marginLeft: 5,
        fontSize: 14,
    },

    // Scroll Area with Video Responses
    scrollContainer: { flex: 1, paddingHorizontal: 16 },
    responseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        borderColor: '#ccc',
    },
    videoThumbnail: { width: 80, height: 80, marginRight: 16 },
    responseTextContainer: { flex: 1 },
    responseTitle: { fontSize: 16, fontWeight: 'bold' },
    responseDescription: { fontSize: 14, color: '#666', marginTop: 4 },

    // Coins Info Styling
    coinsInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    coinsTextSmall: { fontSize: 14, marginRight: 4 },

    // Bottom Navigation Bar Styling
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    navButton: { alignItems: 'center' },
});

export default ChatScreen;
