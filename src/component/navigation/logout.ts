// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// export const useLogout = () => {
//     const navigation = useNavigation();

//     const logout = async () => {
//         try {
//             // Xóa tất cả các thông tin người dùng đã lưu trong AsyncStorage
//             // await AsyncStorage.removeItem('accessToken');
//             // await AsyncStorage.removeItem('userId');
//             // Xóa tất cả dữ liệu cần thiết (Bạn có thể thêm các key khác nếu cần thiết)

//             // Kiểm tra xem token đã bị xóa chưa
//             const token = await AsyncStorage.getItem('accessToken');
//             if (!token) {
//                 console.log('Token successfully removed');
//             } else {
//                 console.log('Failed to remove token');
//             }

//         } catch (error) {
//             console.error('Logout error:', error);
//             // Thông báo lỗi nếu có vấn đề khi logout
//         }
//     };

//     return logout;
// };
