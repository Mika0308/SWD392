import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Define the type for a transaction
interface Transaction {
    id: number;
    amount: number;
    type: 'credit' | 'debit';
    date: string;
}

const WalletScreen: React.FC = () => {
    // Define the initial balance
    const [balance, setBalance] = useState<number>(250.00);

    // Example transactions
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 1, amount: 50, type: 'credit', date: '2024-09-25' },
        { id: 2, amount: 30, type: 'debit', date: '2024-09-20' },
        { id: 3, amount: 120, type: 'credit', date: '2024-09-15' },
        { id: 4, amount: 25, type: 'debit', date: '2024-09-10' },
    ]);

    // Handle adding funds to the wallet
    const addFunds = (amount: number) => {
        setBalance(prevBalance => prevBalance + amount);
        const newTransaction: Transaction = {
            id: transactions.length + 1,
            amount: amount,
            type: 'credit',
            date: new Date().toISOString().slice(0, 10),
        };
        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    };

    // Format the transaction amount based on type (credit or debit)
    const renderTransaction = ({ item }: { item: Transaction }) => (
        <View style={styles.transactionItem}>
            <Text>{item.date}</Text>
            <Text style={item.type === 'credit' ? styles.credit : styles.debit}>
                {item.type === 'credit' ? `+ $${item.amount}` : `- $${item.amount}`}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Balance Section */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceTitle}>Your Balance</Text>
                <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
            </View>

            {/* Add Funds Button */}
            <TouchableOpacity style={styles.addFundsButton} onPress={() => addFunds(100)}>
                <Text style={styles.addFundsText}>Add $100</Text>
            </TouchableOpacity>

            {/* Transaction History */}
            <Text style={styles.transactionsTitle}>Transaction History</Text>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={item => item.id.toString()}
                style={styles.transactionsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
        marginTop: 35,
    },
    balanceContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    balanceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#2e7d32', // Green color for positive balance
    },
    addFundsButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    addFundsText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    transactionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    transactionsList: {
        flex: 1,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    credit: {
        color: '#2e7d32', // Green for credit
        fontWeight: 'bold',
    },
    debit: {
        color: '#d32f2f', // Red for debit
        fontWeight: 'bold',
    },
});

export default WalletScreen;
