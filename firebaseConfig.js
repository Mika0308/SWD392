// Import các hàm cần thiết từ SDK của Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Cấu hình Firebase cho ứng dụng của bạn
const firebaseConfig = {
    apiKey: "AIzaSyAxM4pVck9Z115cMR4n1OE2eHGsxCkJkU0",
    authDomain: "swd-mobile.firebaseapp.com",
    projectId: "swd-mobile",
    storageBucket: "swd-mobile.appspot.com",
    messagingSenderId: "1047399502418",
    appId: "1:1047399502418:web:f945c2b56cc2f76930c58b",
    measurementId: "G-F6MNB7XHTQ" // có thể để lại hoặc loại bỏ vì không cần thiết
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
