import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterItem {
    name: string;
    children?: FilterItem[];
}

const filters: FilterItem[] = [
    { name: 'Calculus', children: [{ name: 'Differentiation' }, { name: 'Integration' }] },
    { name: 'Algebra', children: [{ name: 'Linear Equations' }, { name: 'Quadratic Equations' }] },
    { name: 'Geometry', children: [{ name: 'Triangles' }, { name: 'Circles' }] },
];

const AITool: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

    const toggleFilter = (filter: string) => {
        setExpandedFilter(expandedFilter === filter ? null : filter);
    };

    const handleFilterSelect = (filter: string) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((item) => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const handleSearch = () => {
        console.log('Search query:', searchQuery);
        console.log('Selected filters:', selectedFilters);
        // Logic for searching based on the query and filters
        // Trigger video generation based on the selected filters and search query
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search math problems..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={handleSearch} // Triggers search on Enter
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <MaterialIcons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Filter Section */}
            <ScrollView contentContainerStyle={styles.filterContainer}>
                {filters.map((filter, index) => (
                    <View key={index} style={styles.filterItem}>
                        <TouchableOpacity onPress={() => toggleFilter(filter.name)} style={styles.filterParent}>
                            <Text style={styles.filterText}>{filter.name}</Text>
                            <MaterialIcons name={expandedFilter === filter.name ? "expand-less" : "expand-more"} size={24} color="black" />
                        </TouchableOpacity>
                        {expandedFilter === filter.name && filter.children && (
                            <View style={styles.filterChildren}>
                                {filter.children.map((child, childIndex) => (
                                    <TouchableOpacity
                                        key={childIndex}
                                        style={styles.childFilterItem}
                                        onPress={() => handleFilterSelect(child.name)}
                                    >
                                        <Text
                                            style={[
                                                styles.childFilterText,
                                                selectedFilters.includes(child.name) ? styles.selectedFilter : null,
                                            ]}
                                        >
                                            {child.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Generate Video Button */}
            <TouchableOpacity style={styles.generateButton} onPress={handleSearch}>
                <Text style={styles.generateButtonText}>Generate Video</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
    searchButton: {
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    filterContainer: {
        flexGrow: 1,
    },
    filterItem: {
        marginBottom: 10,
    },
    filterParent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 8,
    },
    filterText: {
        fontSize: 18,
        color: '#333',
    },
    filterChildren: {
        paddingLeft: 20,
        marginTop: 5,
    },
    childFilterItem: {
        paddingVertical: 8,
    },
    childFilterText: {
        fontSize: 16,
        color: '#555',
    },
    selectedFilter: {
        color: '#2196F3',
        fontWeight: 'bold',
    },
    generateButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    generateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AITool;
