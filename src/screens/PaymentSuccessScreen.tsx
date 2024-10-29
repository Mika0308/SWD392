import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PaymentSuccessScreen: React.FC = () => {
    const route = useRoute();
    const { responseCode, transactionNo } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.successMessage}>Thanh toán thành công!</Text>
            <Text>Mã giao dịch: {transactionNo}</Text>
            {/* Có thể thêm thông tin khác như thời gian, số tiền, v.v. */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    successMessage: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32' },
});

export default PaymentSuccessScreen;
