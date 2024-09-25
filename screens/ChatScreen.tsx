import React from 'react';
import { Text, View, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen: React.FC = () => {
    return (
        <View style={styles.container}>
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

            {/* Search Input */}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput placeholder="Your Math Here..." style={styles.searchInput} />
                <TouchableOpacity>
                    <FontAwesome name="arrow-right" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Suggestions List */}
            <ScrollView style={styles.scrollContainer}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={styles.suggestionCard}>
                        <Image source={{ uri: 'https://i.imgur.com/IpEsYSH.png' }} style={styles.thumbnail} />
                        <View style={styles.suggestionTextContainer}>
                            <Text style={styles.suggestionTitle}>Suggestion Video {index + 1}</Text>
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
    container: { flex: 1, backgroundColor: '#fff' },
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
    scrollContainer: { flex: 1, paddingHorizontal: 16 },
    suggestionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        borderColor: '#ccc',
    },
    thumbnail: { width: 80, height: 80, marginRight: 16 },
    suggestionTextContainer: { flex: 1 },
    suggestionTitle: { fontSize: 16, fontWeight: 'bold' },
    coinsInfo: { flexDirection: 'row', alignItems: 'center' },
    coinsTextSmall: { fontSize: 14, marginRight: 4 },
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
