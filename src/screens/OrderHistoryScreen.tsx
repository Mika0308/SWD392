import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, Modal, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, ResizeMode } from 'expo-av';

// Define a type for the solution data
interface Solution {
    id: string;
    link: string;
    description: string;
}

const MyComponent = () => {
    const [subjects, setSubjects] = useState<{ id: string, name: string }[]>([]);
    const [chapters, setChapters] = useState<{ id: string, name: string }[]>([]);
    const [topics, setTopics] = useState<{ id: string, name: string }[]>([]);
    const [problemTypes, setProblemTypes] = useState<{ id: string, name: string }[]>([]);
    const [inputParameters, setInputParameters] = useState<{ id: string, input: string, active: boolean }[]>([]);
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // For toggling modal visibility
    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

    const [loading, setLoading] = useState(false);
    const [chapterLoading, setChapterLoading] = useState(false);
    const [topicLoading, setTopicLoading] = useState(false);
    const [problemTypeLoading, setProblemTypeLoading] = useState(false);
    const [inputLoading, setInputLoading] = useState(false);
    const [solutionLoading, setSolutionLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [chapterError, setChapterError] = useState<string | null>(null);
    const [topicError, setTopicError] = useState<string | null>(null);
    const [problemTypeError, setProblemTypeError] = useState<string | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);
    const [solutionError, setSolutionError] = useState<string | null>(null);



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

            const response = await fetch('https://mindmath.azurewebsites.net/api/subjects/active', {
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
            setSubjects(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
            setError('Failed to fetch subjects. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTopics(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch topics:", error);
            setTopicError('Failed to fetch topics. Please try again later.');
        } finally {
            setTopicLoading(false);
        }
    };

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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProblemTypes(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch problem types:", error);
            setProblemTypeError('Failed to fetch problem types. Please try again later.');
        } finally {
            setProblemTypeLoading(false);
        }
    };

    const fetchInputParameters = async (problemTypeId: string) => {
        setInputLoading(true);
        setInputError(null);

        try {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!userId) {
                console.log('User ID not found in AsyncStorage');
                setInputError('User ID not found. Please log in again.');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/problem-types/${problemTypeId}/users/${userId}/input-parameters/active`, {
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
            setInputParameters(data.map((item: any) => ({ id: item.id, input: item.input, active: item.active })));
        } catch (error) {
            console.error("Failed to fetch input parameters:", error);
            setInputError('Failed to fetch input parameters. Please try again later.');
        } finally {
            setInputLoading(false);
        }
    };

    const fetchSolution = async (inputParameterId: string) => {
        setSolutionLoading(true);
        setSolutionError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/solutions/${inputParameterId}`, {
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

            // Check if the data is an object and handle accordingly
            if (data && data.id) {
                // If data is a single object, put it in an array for rendering
                setSolutions([{
                    id: data.id,
                    link: data.link,
                    description: data.description,
                }]);
            } else {
                // Handle the case where the expected data structure is not returned
                setSolutionError('Failed to fetch solution. Data is not in the expected format.');
            }
        } catch (error) {
            console.error("Failed to fetch solution:", error);
            setSolutionError('Failed to fetch solution. Please try again later.');
        } finally {
            setSolutionLoading(false);
        }
    };

    const handleSolutionPress = (solution: Solution) => {
        setSelectedSolution(solution);
        setIsModalVisible(true); // Show the modal
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible); // Toggle modal visibility
    };

    const handleShowLink = (solutionLink: string) => {
        Alert.alert('Video Link', solutionLink); // Displaying the video link in an alert
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.sectionTitle}>Subjects</Text>
                {subjects.map((subject) => (
                    <TouchableOpacity
                        key={subject.id}
                        style={styles.card}
                        onPress={() => fetchChapters(subject.id)}
                    >
                        <Text style={styles.cardText}>{subject.name}</Text>
                    </TouchableOpacity>
                ))}

                {chapterLoading && <ActivityIndicator size="small" color="#0000ff" />}
                {chapterError && <Text style={styles.errorText}>{chapterError}</Text>}

                <Text style={styles.sectionTitle}>Chapters</Text>
                {chapters.map((chapter) => (
                    <TouchableOpacity
                        key={chapter.id}
                        style={styles.card}
                        onPress={() => fetchTopics(chapter.id)}
                    >
                        <Text style={styles.cardText}>{chapter.name}</Text>
                    </TouchableOpacity>
                ))}

                {topicLoading && <ActivityIndicator size="small" color="#0000ff" />}
                {topicError && <Text style={styles.errorText}>{topicError}</Text>}

                <Text style={styles.sectionTitle}>Topics</Text>
                {topics.map((topic) => (
                    <TouchableOpacity
                        key={topic.id}
                        style={styles.card}
                        onPress={() => fetchProblemTypes(topic.id)}
                    >
                        <Text style={styles.cardText}>{topic.name}</Text>
                    </TouchableOpacity>
                ))}

                {problemTypeLoading && <ActivityIndicator size="small" color="#0000ff" />}
                {problemTypeError && <Text style={styles.errorText}>{problemTypeError}</Text>}

                <Text style={styles.sectionTitle}>Problem Types</Text>
                {problemTypes.map((problemType) => (
                    <TouchableOpacity
                        key={problemType.id}
                        style={styles.card}
                        onPress={() => fetchInputParameters(problemType.id)}
                    >
                        <Text style={styles.cardText}>{problemType.name}</Text>
                    </TouchableOpacity>
                ))}

                {inputLoading && <ActivityIndicator size="small" color="#0000ff" />}
                {inputError && <Text style={styles.errorText}>{inputError}</Text>}

                <Text style={styles.sectionTitle}>Input Parameters</Text>
                {inputParameters.map((input) => (
                    <TouchableOpacity
                        key={input.id}
                        style={styles.card}
                        onPress={() => fetchSolution(input.id)}
                    >
                        <Text style={styles.cardText}>{input.input}</Text>
                    </TouchableOpacity>
                ))}

                {solutionLoading && <ActivityIndicator size="small" color="#0000ff" />}
                {solutionError && <Text style={styles.errorText}>{solutionError}</Text>}

                <Text style={styles.sectionTitle}>Solutions</Text>
                {solutions.map((solution) => (
                    <TouchableOpacity
                        key={solution.id}
                        style={styles.card}
                        onPress={() => handleSolutionPress(solution)}
                    >
                        <Text style={styles.cardText}>{solution.description}</Text>
                    </TouchableOpacity>
                ))}

                {/* Modal to show video */}
                <Modal
                    visible={isModalVisible}
                    onRequestClose={toggleModal}
                    animationType="slide"
                >
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
                                {/* Button to show the link */}
                                <TouchableOpacity style={styles.videoButton} onPress={() => handleShowLink(selectedSolution.link)}>
                                    <Text style={styles.downloadButton}>Show Link</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, // Adds space at the bottom of the screen
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    card: {
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    video: {
        width: '100%',
        height: 300,
    },
    videoButton: {
        padding: 10,
        backgroundColor: '#00f',
        borderRadius: 5,
        marginTop: 10,
    },
    downloadButton: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default MyComponent;