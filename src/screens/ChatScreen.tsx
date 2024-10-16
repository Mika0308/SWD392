import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

interface FilterItem {
    id: string;
    name: string;
}

const AITool: React.FC = () => {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [chapters, setChapters] = useState<FilterItem[]>([]);
    const [chapterLoading, setChapterLoading] = useState<boolean>(false);
    const [chapterError, setChapterError] = useState<string | null>(null);

    // Fetch subjects and handle errors
    const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id) {
                console.log('User ID not found in AsyncStorage');
                setError('User ID not found. Please log in again.');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/subjects/active`, {
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
            setFilters(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
            setError('Failed to fetch subjects. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch chapters for a given subject ID and handle errors
    const fetchChapters = async (subjectId: string) => {
        setChapterLoading(true);
        setChapterError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/subjects/${subjectId}/chapters/active`, {
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
            setChapters(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch chapters:", error);
            setChapterError('Failed to fetch chapters. Please try again later.');
        } finally {
            setChapterLoading(false);
        }
    };

    // Handle subject selection and trigger chapter fetching
    const handleSubjectChange = (subjectId: string) => {
        setSelectedSubject(subjectId);
        fetchChapters(subjectId);  // Fetch chapters for the selected subject
    };

    // Fetch subjects when the component mounts
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Handle search action
    const handleSearch = () => {
        console.log('Search query:', searchQuery);
        console.log('Selected subject:', selectedFilters[0]);  // Assuming single subject selection
        console.log('Selected chapters:', chapters);
    };

    // UI Rendering
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text>Loading subjects...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Math Solver AI</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search subjects..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={handleSearch}
                />
            </View>
            <Text style={styles.label}>Select Subject:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleSubjectChange(value)}
                items={filters.map((filter) => ({ label: filter.name, value: filter.id }))}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a subject', value: null }}
                value={selectedSubject}
            />

            {selectedSubject && (
                <View>
                    <Text style={styles.label}>Select Chapter:</Text>
                    {chapterLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#2196F3" />
                            <Text>Loading chapters...</Text>
                        </View>
                    ) : chapterError ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{chapterError}</Text>
                        </View>
                    ) : (
                        <RNPickerSelect
                            onValueChange={(value) => console.log('Chapter selected:', value)}
                            items={chapters.map((chapter) => ({ label: chapter.name, value: chapter.id }))}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select a chapter', value: null }}
                        />
                    )}
                </View>
            )}

            <TouchableOpacity style={styles.generateButton} onPress={() => console.log('Generate Video')}>
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
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 16,
        // paddingHorizontal: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
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
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
    },
});

export default AITool;
