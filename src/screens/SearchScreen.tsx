import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Define the type for an item
interface SearchItem {
    id: number;
    name: string;
    description: string;
}

const SearchScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>(''); // The search input value
    const [filteredData, setFilteredData] = useState<SearchItem[]>([]); // The filtered results

    // Sample data for searching
    const searchData: SearchItem[] = [
        { id: 1, name: 'Đại Số Tuyến Tính', description: 'Tìm hiểu về các khái niệm cơ bản trong đại số tuyến tính.' },
        { id: 2, name: 'Giải Tích Số', description: 'Các chủ đề nâng cao trong giải tích số.' },
        { id: 3, name: 'Hình Học Không Gian', description: 'Chinh phục các bài toán hình học không gian.' },
        { id: 4, name: 'Xác Suất Thống Kê', description: 'Khái niệm và ứng dụng của xác suất thống kê.' },
        { id: 5, name: 'Toán Rời Rạc', description: 'Xây dựng nền tảng cho toán học rời rạc và ứng dụng.' },
    ];


    // Handle search functionality
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const results = searchData.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(results);
        } else {
            setFilteredData([]);
        }
    };

    // Render each search result
    const renderSearchItem = ({ item }: { item: SearchItem }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search for items..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Display Search Results */}
            <FlatList
                data={filteredData}
                renderItem={renderSearchItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={searchQuery ? (
                    <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
                ) : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 18,
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    noResultsText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
        marginTop: 20,
    },
});

export default SearchScreen;
