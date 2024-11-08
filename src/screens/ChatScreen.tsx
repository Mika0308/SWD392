import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, ResizeMode } from 'expo-av';
interface ProblemType {
    id: string;
    name: string;
    description: string;
    numberOfInputs: number;
    active: boolean;
}

interface Solution {
    id: string;
    link: string;
    description: string;
}

const AiTool = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<{ id: string, name: string }[]>([]);
    const [chapterLoading, setChapterLoading] = useState<boolean>(false);
    const [chapterError, setChapterError] = useState<string | null>(null);
    const [chapters, setChapters] = useState<{ id: string, name: string }[]>([]);
    const [topicLoading, setTopicLoading] = useState<boolean>(false);
    const [topicError, setTopicError] = useState<string | null>(null);
    const [topics, setTopics] = useState<{ id: string, name: string }[]>([]);
    const [problemTypeLoading, setProblemTypeLoading] = useState<boolean>(false);
    const [problemTypeError, setProblemTypeError] = useState<string | null>(null);
    const [problemTypes, setProblemTypes] = useState<ProblemType[]>([]);
    const [selectedProblemType, setSelectedProblemType] = useState<ProblemType | null>(null);
    const [inputValues, setInputValues] = useState<string[]>([]);
    const [inputLoading, setInputLoading] = useState<boolean>(false);
    const [inputError, setInputError] = useState<string | null>(null);
    const [inputParameterId, setInputParameterId] = useState<string | null>(null);
    const [submittedInputs, setSubmittedInputs] = useState<{ id: string; input: string }[]>([]);
    const [solutionData, setSolutionData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
    const [solutionLoading, setSolutionLoading] = useState(false);
    const [solutionError, setSolutionError] = useState<string | null>(null);


    // Fetch subjects
    const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/subjects/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setFilters(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
            setError('Failed to fetch subjects. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch chapters
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

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setChapters(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch chapters:", error);
            setChapterError('Failed to fetch chapters. Please try again later.');
        } finally {
            setChapterLoading(false);
        }
    };

    // Fetch topics
    const fetchTopics = async (chapterId: string) => {
        setTopicLoading(true);
        setTopicError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/chapters/${chapterId}/topics/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setTopics(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch topics:", error);
            setTopicError('Failed to fetch topics. Please try again later.');
        } finally {
            setTopicLoading(false);
        }
    };

    // Fetch problem types
    const fetchProblemTypes = async (topicId: string) => {
        setProblemTypeLoading(true);
        setProblemTypeError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/topics/${topicId}/problem-types/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setProblemTypes(data.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                numberOfInputs: item.numberOfInputs,
                active: item.active,
            })));
        } catch (error) {
            console.error("Failed to fetch problem types:", error);
            setProblemTypeError('Failed to fetch problem types. Please try again later.');
        } finally {
            setProblemTypeLoading(false);
        }
    };

    // Fetch input parameters for the selected problem type
    const submitInputParameters = async () => {
        setLoading(true);
        try {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');
            const problemTypeId = selectedProblemType?.id;

            if (!userId || !problemTypeId) {
                throw new Error('User ID or Problem Type ID is missing. Please try again.');
            }

            // Convert userId to a string (if necessary)
            const userIdString = userId.toString();  // Ensure userId is a string

            // Create a string from input values
            const inputString = inputValues.join(",");  // join inputs with commas (or another delimiter)

            const response = await fetch(
                `https://mindmath.azurewebsites.net/api/problem-types/${problemTypeId}/users/${userIdString}/input-parameters`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ input: inputString }),  // Adjust body to match the expected format
                }
            );

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            // Assuming the API returns an object with an 'id' for the input parameter (not userId)
            if (data && data.id) {
                // Use the input parameter ID from the response (not the userId)
                setSubmittedInputs([{ id: data.id, input: data.input }]); // Ensure id is the correct input ID

                // Alert with the correct ID and inputs
                Alert.alert("Submitted Inputs", `Input ID: ${data.id}, Inputs: ${inputString}`);
            }

        } catch (error) {
            console.error("Failed to submit input parameters:", error);
            Alert.alert("Error", 'Failed to submit input parameters. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateVideo = async () => {
        setLoading(true);
        try {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');
            const problemTypeId = selectedProblemType?.id;

            if (!userId || !problemTypeId) {
                throw new Error('User ID or Problem Type ID is missing.');
            }

            const inputString = inputValues.join(",");
            const response = await fetch(
                `https://mindmath.azurewebsites.net/api/problem-types/${problemTypeId}/users/${userId}/input-parameters`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ input: inputString }),
                }
            );

            if (!response.ok) throw new Error('Failed to submit inputs.');

            const data = await response.json();
            const inputParameterId = data.id;

            await new Promise(resolve => setTimeout(resolve, 65000));

            const solutionResponse = await fetch(
                `https://mindmath.azurewebsites.net/api/solutions/${inputParameterId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (!solutionResponse.ok) throw new Error('Failed to fetch solution.');

            const solutionData = await solutionResponse.json();
            setSelectedSolution(solutionData);
            setIsModalVisible(true);

        } catch (error) {
            // Alert.alert("Error", error.message || 'Failed to generate video.');
        } finally {
            setLoading(false);
        }
    };

    const handleSolutionPress = (solution: Solution) => {
        setSelectedSolution(solution);
        setIsModalVisible(true); // Show the modal
    };

    const handleShowLink = (solutionLink: string) => {
        Alert.alert('Video Link', solutionLink); // Displaying the video link in an alert
    };

    // Toggle the modal visibility
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    // Handle input changes
    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...inputValues];
        updatedInputs[index] = value;
        setInputValues(updatedInputs);
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titleMain}>Math AI Tool</Text>
            <Text style={styles.title}>Subjects</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <View style={styles.cardContainer}>
                    {filters.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => fetchChapters(item.id)}
                        >
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {chapterLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : chapterError ? (
                <Text style={styles.errorText}>{chapterError}</Text>
            ) : chapters.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Chapters</Text>
                    <View style={styles.cardContainer}>
                        {chapters.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => fetchTopics(item.id)}
                            >
                                <Text style={styles.cardTitle}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            {topicLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : topicError ? (
                <Text style={styles.errorText}>{topicError}</Text>
            ) : topics.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Topics</Text>
                    <View style={styles.cardContainer}>
                        {topics.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => fetchProblemTypes(item.id)}
                            >
                                <Text style={styles.cardTitle}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            {problemTypeLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : problemTypeError ? (
                <Text style={styles.errorText}>{problemTypeError}</Text>
            ) : problemTypes.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Problem Types</Text>
                    <View style={styles.cardContainer}>
                        {problemTypes.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => {
                                    setSelectedProblemType(item);
                                    setInputValues(Array(item.numberOfInputs).fill('')); // Reset inputs
                                }}
                            >
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <Text style={styles.cardDescription}>{item.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}


            {selectedProblemType && (
                <>
                    <Text style={styles.inputTitle}>Enter Inputs for: {selectedProblemType?.name}</Text>
                    {inputValues.map((value, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Input ${index + 1}`}
                            value={value}
                            onChangeText={(text) => handleInputChange(index, text)}
                        />
                    ))}

                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.generateButton}
                            onPress={handleGenerateVideo}
                            disabled={loading}
                        >
                            <Text style={styles.generateButtonText}>Generate Video</Text>
                        </TouchableOpacity>

                        {/* Full-screen loading overlay */}
                        <Modal transparent visible={loading} animationType="fade">
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color="#1A1A1D" />
                                <Text style={styles.loadingText}>Generating ~ 65s...</Text>
                            </View>
                        </Modal>
                    </View>
                </>
            )}

            <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide">
                <View style={styles.modalContent}>
                    {selectedSolution && (
                        <>
                            <Video
                                source={{ uri: selectedSolution.link }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode={ResizeMode.COVER}
                                shouldPlay
                                style={styles.video}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f0f4f8', // Light gray background for a modern feel
        marginVertical: 20,
    },
    container1: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginTop: 20,
    },
    titleMain: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CC9FE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    cardContainer: {
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    card: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center', // Center text in cards
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    inputContainer: {
        marginTop: 20,
    },
    inputTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 5,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    generateButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    video: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    loadingOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Light overlay background
    },
    loadingText: {
        color: '#333',   // Dark text for contrast on white background
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default AiTool;
