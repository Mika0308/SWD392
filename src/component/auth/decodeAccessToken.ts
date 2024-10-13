import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: string;
}

const decodeAccessToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const userId = decodedToken.userId;
            console.log('User ID:', userId);
            return userId;
        } else {
            console.log('Không tìm thấy token');
            return null; // Trả về null nếu không tìm thấy token
        }
    } catch (error) {
        console.error('Lỗi giải mã JWT:', error);
        return null; // Trả về null nếu có lỗi
    }
};
