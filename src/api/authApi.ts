import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    Id?: string;
    id?: string;
    // You can add other properties that are part of the token if needed
}

interface CurrentUser {
    id: string;
}

export const getCurrentUser = (): CurrentUser | null => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken.Id || decodedToken.id;

        if (!userId) {
            return null;
        }

        return {
            id: userId
        };
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
