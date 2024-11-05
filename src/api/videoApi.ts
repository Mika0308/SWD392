import axios from 'axios';

const API_URL = "https://mindmath.azurewebsites.net/api";

interface Subject {
    id: string;
    name: string;
}

interface Chapter {
    id: string;
    name: string;
}

interface Topic {
    id: string;
    name: string;
}

interface ProblemType {
    id: string;
    name: string;
    numberOfInputs: number;
}

interface Solution {
    link: string; // Adjust this based on the actual structure of the solution response
}

export const getSubjects = async (): Promise<Subject[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Subject[]>(`${API_URL}/subjects`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error;
    }
};

export const getChapters = async (subjectId: string): Promise<Chapter[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Chapter[]>(`${API_URL}/subjects/${subjectId}/chapters`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                pageSize: 20  // Additional pageSize parameter
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching chapters:", error);
        throw error;
    }
};

export const getTopics = async (chapterId: string): Promise<Topic[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Topic[]>(`${API_URL}/chapters/${chapterId}/topics`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
};

export const getProblemTypes = async (topicId: string): Promise<ProblemType[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get<ProblemType[]>(`${API_URL}/topics/${topicId}/problem-types`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching problem types:", error);
        throw error;
    }
};

export const submitInput = async (problemTypeId: string, userId: string, inputs: string[]): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        // Join multiple inputs with commas
        const input = inputs.join(',');
        const response = await axios.post<any>(
            `${API_URL}/problem-types/${problemTypeId}/users/${userId}/input-parameters`,
            { input },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting input:", error);
        throw error;
    }
};

// Rest of the service remains the same
export const getSolution = async (inputParameterId: string): Promise<Solution> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/solutions/${inputParameterId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get solution: ${errorText}`);
    }

    const solution = await response.json();
    return solution;
};
