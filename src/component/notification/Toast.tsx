import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

interface CustomToastProps {
    text1: string;
    text2: string;
    type?: 'success' | 'error' | 'info';
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, type = 'success' }) => {
    return (
        <View style={[styles.toastContainer, styles[type]]}>
            <Text style={styles.text1}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1000,
    },
    text1: {
        fontWeight: 'bold',
        color: '#fff',
    },
    text2: {
        color: '#fff',
    },
    success: {
        backgroundColor: '#28a745',
    },
    error: {
        backgroundColor: '#dc3545',
    },
    info: {
        backgroundColor: '#17a2b8',
    },
});

export const showToast = (text1: string, text2: string, type: 'success' | 'error' | 'info' = 'success') => {
    Toast.show({
        text1,
        text2,
        type,
        visibilityTime: 3000,
        autoHide: true,
        position: 'top',
    });
};

export default CustomToast;
